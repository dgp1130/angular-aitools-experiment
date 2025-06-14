import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { API_KEY } from './.api_key';
import { Analysis } from '../injection/analyzer';
import { Tree } from '../injection/tree';

@Injectable({ providedIn: 'root' })
export class AI {
    private readonly ai = new GoogleGenAI({
        apiKey: API_KEY,
    });

    async *generate(prompt: string, analysis: Analysis): AsyncGenerator<string, void, void> {
        const fullPrompt = wrapInSystemPrompt(prompt, analysis);
        console.log(fullPrompt); // DEBUG

        const res = await this.ai.models.generateContentStream({
            model: 'gemini-2.0-flash',
            contents: fullPrompt,
        });

        for await (const chunk of res) {
            yield chunk.text!;
        }
    }
}

function wrapInSystemPrompt(prompt: string, analysis: Analysis): string {
    return `
You are an AI advisor for the Angular web framework. You have access to a
particular Angular app running in development mode with extra diagnostics provided
to you. Based on this information, you can provide analysis of the page state and
offer debugging or performance suggestions to the user.

The page contains the following Angular components in a tree structure, each of
which provides a few injection tokens. Use this information to answer questions
about the application's injection hierarchy.

${printAnalysis(analysis)}

Based on the above information, see the following user prompt and respond accordingly:

${prompt}
    `.trim();
}

function printAnalysis(analysis: Analysis): string {
    const providers = analysis.providers
        .map((serializedTree) => Tree.deserialize(
            serializedTree,
            (serialized) => serialized as {tagName: string, providers: string[]},
        ));

    return providers.map((tree) => tree.print(({ tagName, providers }) => `
${tagName} provides ${providers.join(', ')}
    `.trim())).join('\n');
}
