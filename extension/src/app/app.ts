import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly response = signal<string>('');

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
