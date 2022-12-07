import { inspect } from 'util';
import chalk from 'chalk';
import moment from 'moment';

const sendLogs = (level, content, data) => {
  const timestamp = `${moment().format('HH:mm:ss')}`;

  switch (level) {
    case 'log':
      console.log(`[${chalk.cyan(timestamp)}] [${chalk.blueBright('info')}] ${content}`);
      break;

    case 'success':
      console.log(`[${chalk.cyan(timestamp)}] [${chalk.green(level)}] ${content} `);
      break;

    case 'warn':
      console.log(`[${chalk.cyan(timestamp)}] [${chalk.yellow('warn')}] ${content} `);
      break;

    case 'error':
      // eslint-disable-next-line no-case-declarations
      const dataMessage = data ? `: ${inspect(data.message ?? data)}` : '';

      console.log(
        `[${chalk.cyan(timestamp)}] [${chalk.redBright(level)}] ${content} ${dataMessage}`,
      );
      break;

    default:
      break;
  }
};

export const success = (content) => sendLogs('success', content);
export const warn = (content) => sendLogs('warn', content);
export const error = (content, err) => sendLogs('error', content, err);
export const log = (content) => sendLogs('log', content);
