import fs from 'fs';

const readingJson = () => JSON.parse(fs.readFileSync('./src/base/data/data.json', 'utf8'));

export default readingJson;
