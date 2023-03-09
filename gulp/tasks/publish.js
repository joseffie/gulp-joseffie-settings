import { ghPagesConfig } from '../config/options.js';
import { publish as deploy } from 'gh-pages';

const { dir, options } = ghPagesConfig;

export const publish = async () => deploy(dir, options, () => {
  console.log('Build is published!');
});
