import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MessageBus } from '../message_bus';
import { Subscription } from 'rxjs';
import { Analysis } from '../../injection/analyzer';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  private readonly messageBus = inject(MessageBus);

  protected readonly response = signal<string>('');
  protected readonly analysis = signal<Analysis | undefined>(undefined);

  private messageSub?: Subscription;

  ngOnInit(): void {
    this.messageSub = this.messageBus.subscribe().subscribe((message) => {
      const msg = message as {type: string};
      console.log('Received in DevTools panel', msg);
      switch (msg.type) {
        case 'analysis': {
          this.analysis.set((msg as unknown as {analysis: Analysis}).analysis);
          break;
        } default: {
          console.error(`Unknown message type: ${msg.type}`);
          break;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.messageSub?.unsubscribe();
  }

  protected async submit(evt: SubmitEvent): Promise<void> {
    evt.preventDefault();

    const form = evt.target as HTMLFormElement;
    const formData = new FormData(form);
    const prompt = formData.get('prompt')!;

    const response = await sendPrompt(prompt.toString());
    this.response.set(response);
  }
}

async function sendPrompt(prompt: string): Promise<string> {
  return prompt;
}
