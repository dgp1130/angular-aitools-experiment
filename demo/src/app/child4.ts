import { Component } from '@angular/core';

export class Service4 {}

@Component({
    selector: 'app-child-4',
    template: `
        <div>Child 4</div>
    `,
    providers: [
        {
            provide: Service4,
            useClass: Service4,
        },
    ],
})
export class Child4 {}
