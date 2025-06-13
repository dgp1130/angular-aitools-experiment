import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageBus {
    subscribe(): Observable<unknown> {
        return new Observable((sub) => {
            const listener = (msg: unknown) => {
                sub.next(msg);
            };

            chrome.runtime.onMessage.addListener(listener);
            return () => {
                chrome.runtime.onMessage.removeListener(listener);
            };
        });
    }
}
