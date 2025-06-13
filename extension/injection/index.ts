import { analyze } from './analyzer.js';

(async () => {
    const analysis = await analyze();
    console.log(analysis);
})();
