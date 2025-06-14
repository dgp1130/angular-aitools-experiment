import { Component } from '@angular/core';
import { Child5 } from './child5';
import { Child6 } from './child6';

export class Service2 {}

@Component({
    selector: 'app-child-2',
    template: `
        <div>Child 2</div>

        <app-child-5 />
        <app-child-6 />
    `,
    imports: [Child5, Child6],
    providers: [
        {
            provide: Service2,
            useClass: Service2,
        },
    ],
})
export class Child2 {}
