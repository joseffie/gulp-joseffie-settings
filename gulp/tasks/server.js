import { browserSyncConfig } from '../config/options.js';
import browserSync from 'browser-sync';

export const server = () => browserSync.init(browserSyncConfig);
