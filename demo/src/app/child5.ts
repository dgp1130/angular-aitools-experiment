import { Component } from '@angular/core';

class Service5 {}

@Component({
    selector: 'app-child-5',
    template: `
        <div>Child 5</div>
    `,
    providers: [
        {
            provide: Service5,
            useClass: Service5,
        },
    ],
})
export class Child5 {}
