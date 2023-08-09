import { dirs } from '../../app.config.cjs';
import { readdirSync, readFileSync } from 'fs';
import { extname } from 'path';

export default () => {
  const parsedData = readdirSync(`${dirs.src}/base/data`)
    .filter((file) => extname(file) === '.json')
    .map((file) => {
      const pathToFile = `${dirs.src}/base/data/${file}`;

      return JSON.parse(readFileSync(pathToFile, 'utf8'));
    });

  return Object.assign({}, ...parsedData);
};
