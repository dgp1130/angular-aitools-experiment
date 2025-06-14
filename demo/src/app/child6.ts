import { Component } from '@angular/core';

export class Service6 {}

@Component({
    selector: 'app-child-6',
    template: `
        <div>Child 6</div>
    `,
    providers: [
        {
            provide: Service6,
            useClass: Service6,
        },
    ],
})
export class Child6 {}
