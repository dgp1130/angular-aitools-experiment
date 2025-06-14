export function collectLogs(cb: (...args: unknown[]) => void): () => void {
    const realError = console.error;
    console.error = (...args) => {
        cb(...args);
        realError.apply(console, args);
    };

    return () => {
        console.error = realError;
    };
}
