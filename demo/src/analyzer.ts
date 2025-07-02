import type { InjectionToken, Injector, Type } from '@angular/core';
import { type SerializedTree, Tree } from './tree';

/** Stores the analysis about a particular frame. */
export interface Analysis {
    /** Temporary test string. */
    providers: Array<SerializedTree>;
}

export interface ProviderMetadata {
    tagName: string;
    providers: string[];
}

interface ProviderRecord {
    token: Type<unknown> | InjectionToken<unknown>;
}

interface NgGlobal {
    getInjector(node: Node): Injector | null;
    ɵgetInjectorProviders(injector: Injector): ProviderRecord[];
}

/** Analyzes the current page. */
export async function analyze(root: Element): Promise<Analysis> {
    const ng = (globalThis as any).ng as NgGlobal;
    const providers = walkProviders(ng, walkInjectors(ng, walkDom(root)));
    return {
        providers: providers.flatMap((tree) => {
            return tree.map(({ element, providers }) => ({
                tagName: element.tagName.toLowerCase(),
                providers: providers.map((provider) => getProviderName(provider.token)),
            })).serialize(({ tagName, providers }) => ({ tagName, providers }));
        }),
    };
}

function walkDom(root: Element): Tree<Element> {
    return new Tree(
        root,
        Array.from(root.children, (child) => walkDom(child))
    );
}

function walkInjectors(ng: NgGlobal, elements: Tree<Element>):
        Array<Tree<{ element: Element, injector: Injector }>> {
    return elements.optionalMap((element) => {
        const injector = ng.getInjector(element);
        if (!injector) return undefined;

        return { element, injector };
    });
}

function walkProviders(
    ng: NgGlobal,
    forest: Array<Tree<{ element: Element, injector: Injector }>>,
): Array<Tree<{ element: Element, providers: ProviderRecord[] }>> {
    return forest.flatMap((tree) => {
        return tree.optionalMap(({ element, injector }) => {
            const providers = ng.ɵgetInjectorProviders(injector);
            if (providers.length === 0) return undefined;
            return { element, providers };
        });
    });
}

function getProviderName(token: Type<unknown> | InjectionToken<unknown>): string {
    if (typeof token === 'function') {
        return token.name;
    } else {
        return token.toString();
    }
}
