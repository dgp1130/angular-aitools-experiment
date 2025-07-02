import { Component, inject } from '@angular/core';
import { TestService } from './test-service';

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
        {
            provide: TestService,
            useClass: TestService,
        },
    ],
})
export class Child4 {
    private readonly testService = inject(TestService);

    ngOnInit(): void {
        console.log(`Child4 is using \`TestService\` #${this.testService.id}.`);
    }
}
