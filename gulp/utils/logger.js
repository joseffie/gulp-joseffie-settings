import { inspect } from 'util';
import chalk from 'chalk';
import moment from 'moment';

/**
 * @param { string } level
 * @param { string } content
 * @param { string } data
 */
const sendLogs = (level, content, data) => {
  const timestamp = chalk.gray(moment().format('HH:mm:ss'));

  switch (level) {
    case 'info':
      console.log(`[${timestamp}] [${chalk.blueBright('info')}] ${content}`);
      break;

    case 'success':
      console.log(`[${timestamp}] [${chalk.green('success')}] ${content} `);
      break;

    case 'warn':
      console.log(`[${timestamp}] [${chalk.yellow('warn')}] ${content} `);
      break;

    case 'error':
      // eslint-disable-next-line no-case-declarations
      const dataMessage = data ? inspect(data.message ?? data) : '';

      console.log(
        `[${timestamp}] [${chalk.redBright('error')}] ${content} : ${dataMessage}`,
      );
      break;

    default:
      break;
  }
};

export const success = (content) => sendLogs('success', content);

export const warn = (content) => sendLogs('warn', content);

export const error = (content, err) => sendLogs('error', content, err);

export const log = (content) => sendLogs('info', content);
