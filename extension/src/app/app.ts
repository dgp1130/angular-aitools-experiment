import { Component, ElementRef, inject, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import { MessageBus } from '../message_bus';
import { Subscription } from 'rxjs';
import { Analysis } from '../../injection/analyzer';
import { AI } from '../ai';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected readonly suggestions = Object.freeze([
    'What can I inject from `child-3`?',
    'Why can\'t I inject `Service1` from `child-5`?',
  ]);

  private readonly ai = inject(AI);
  private readonly messageBus = inject(MessageBus);
  private readonly promptTextarea = viewChild.required<ElementRef<HTMLTextAreaElement>>('prompt');

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

    const analysis = this.analysis();
    if (!analysis) throw new Error('Expected analysis to be completed.');

    const form = evt.target as HTMLFormElement;
    const formData = new FormData(form);
    const prompt = formData.get('prompt')!;

    this.response.set(''); // Clear any previous prompt.
    for await (const chunk of this.ai.generate(prompt.toString(), analysis)) {
      this.response.update((res) => res + chunk);
    }
  }

  protected applySuggestion(suggestion: string): void {
    this.promptTextarea().nativeElement.value = suggestion;
  }
}
