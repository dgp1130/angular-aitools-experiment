import type { InjectionToken, Injector, Provider, Type } from '@angular/core';

/** Stores the analysis about a particular frame. */
export interface Analysis {
    /** Temporary test string. */
    providers: Array<{
        tagName: string,
        providers: string[],
    }>;
}

interface ProviderRecord {
    token: Type<unknown> | InjectionToken<unknown>;
}

interface NgGlobal {
    getInjector(node: Node): Injector | null;
    ɵgetInjectorProviders(injector: Injector): ProviderRecord[];
}

const ng = (globalThis as any).ng as NgGlobal;

/** Analyzes the current page. */
export async function analyze(): Promise<Analysis> {
    const roots = document.querySelectorAll('[ng-version]');
    const providers = Array.from(walkProviders(walkInjectors(walkDom(roots))));
    return {
        providers: providers.map(([el, providers]) => ({
            tagName: el.tagName.toLowerCase(),
            providers: providers.map((provider) => getProviderName(provider.token)),
        })),
    };
}

function* walkDom(roots: Iterable<Element>): Generator<Element, void, void> {
    for (const root of roots) {
        yield root;
        yield* walkDom(root.children);
    }
}

function* walkInjectors(elements: Iterable<Element>):
        Generator<[el: Element, injector: Injector], void, void> {
    for (const el of elements) {
        const injector = ng.getInjector(el);
        if (injector) yield [el, injector];
    }
}

function* walkProviders(injectors: Iterable<[el: Element, injector: Injector]>):
        Generator<[el: Element, providers: ProviderRecord[]], void, void> {
    for (const [el, injector] of injectors) {
        const providers = ng.ɵgetInjectorProviders(injector);
        if (providers.length !== 0) yield [el, providers];
    }
}

function getProviderName(token: Type<unknown> | InjectionToken<unknown>): string {
    if (typeof token === 'function') {
        return token.name;
    } else {
        return token.toString();
    }
}
