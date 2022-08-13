export const isProd = process.argv.includes('--production');
export const isDev = !process.argv.includes('--production');

const environment = isProd ? 'production' : 'development';

export default environment;
