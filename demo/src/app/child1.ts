import { Component } from '@angular/core';
import { Child3 } from './child3';
import { Child4 } from './child4';

export class Service1 {}

@Component({
    selector: 'app-child-1',
    template: `
        <div>Child 1</div>

        <app-child-3 />
        <app-child-4 />
    `,
    imports: [Child3, Child4],
    styles: `
        :host {
            display: block;
        }

        app-child-3, app-child-4 {
            margin-left: 1rem;
        }
    `,
    providers: [
        {
            provide: Service1,
            useClass: Service1,
        },
    ],
})
export class Child1 {}
