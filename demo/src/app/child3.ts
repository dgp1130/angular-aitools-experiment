import { Component } from '@angular/core';

export class Service3 {}

@Component({
    selector: 'app-child-3',
    template: `
        <div>Child 3</div>
    `,
    providers: [
        {
            provide: Service3,
            useClass: Service3,
        },
    ],
})
export class Child3 {}
