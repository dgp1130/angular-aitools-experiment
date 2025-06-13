/** Stores the analysis about a particular frame. */
export interface Analysis {
    /** Temporary test string. */
    test: string;
}

/** Analyzes a specific frame. */
export async function analyzeFrame(
    tabId: number,
    frameId: number = 0,
): Promise<Analysis> {
    const results = await new Promise<chrome.scripting.InjectionResult<string>[]>((resolve) => {
        chrome.scripting.executeScript({
            target: {
                tabId,
                frameIds: [frameId],
            },
            func: () => {
                return 'test';
            },
        }, (result) => {
            resolve(result);
        });
    });

    if (results.length > 1) throw new Error('Expected one result.');
    const [{result}] = results;

    return {
        test: result!,
    };
}
