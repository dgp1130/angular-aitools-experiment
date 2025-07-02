import { Component, inject, OnInit } from '@angular/core';
import { TestService } from './test-service';

export class Service3 {}

@Component({
    selector: 'app-child-3',
    template: `
        <div>Child 3</div>
    `,
    styles: `
        :host {
            display: block;
        }
    `,
    providers: [
        {
            provide: Service3,
            useClass: Service3,
        },
        {
            provide: TestService,
            useClass: TestService,
        },
    ],
})
export class Child3 implements OnInit {
    private readonly testService = inject(TestService);

    ngOnInit(): void {
        console.log(`Child3 is using \`TestService\` #${this.testService.id}.`);
    }
}
