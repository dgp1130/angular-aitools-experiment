import { Component, inject } from '@angular/core';
import { Service1 } from './child1';
import { TestService } from './test-service';

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
        {
            provide: TestService,
            useClass: TestService,
        },
    ],
})
export class Child5 {
    private readonly testService = inject(TestService);

    constructor() {
        try {
            inject(Service1);
        } catch (err) {
            console.error(err);
        }
    }

    ngOnInit(): void {
        console.log(`Child5 is using \`TestService\` #${this.testService.id}.`);
    }
}
