import { Component } from '@angular/core';

export class Service4 {}

@Component({
    selector: 'app-child-4',
    template: `
        <div>Child 4</div>
    `,
    styles: `
        :host {
            display: block;
        }
    `,
    providers: [
        {
            provide: Service4,
            useClass: Service4,
        },
    ],
})
export class Child4 {}
