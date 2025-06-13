import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { API_KEY } from './.api_key';

@Injectable({ providedIn: 'root' })
export class AI {
    private readonly ai = new GoogleGenAI({
        apiKey: API_KEY,
    });

    async generate(prompt: string): Promise<string> {
        const res = await this.ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
        });
        return res.text!;
    }
}
