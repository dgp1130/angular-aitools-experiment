import { Component, inject } from '@angular/core';
import { Service1 } from './child1';

export class Service5 {}

@Component({
    selector: 'app-child-5',
    template: `
        <div>Child 5</div>
    `,
    styles: `
        :host {
            display: block;
        }
    `,
    providers: [
        {
            provide: Service5,
            useClass: Service5,
        },
    ],
})
export class Child5 {
    constructor() {
        try {
            inject(Service1);
        } catch (err) {
            console.error(err);
        }
    }
}
