const winston = require('winston');
const { SeqTransport } = require('@datalust/winston-seq');
// or import { SeqTransport } from '@datalust/winston-seq';
const { GetUrl } = require('./serviceurls');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(  /* This is required to get errors to log with stack traces. See https://github.com/winstonjs/winston/issues/1498 */
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  defaultMeta: { application: 'ShipmentService' },
  transports: [
    new winston.transports.Console({
        format: winston.format.simple(),
    }),
    new SeqTransport({
      serverUrl: `http://${GetUrl('seq')}`,
      //apiKey: "your-api-key",
      onError: (e => { console.error(e) }),
      handleExceptions: true,
      handleRejections: true,
    })
  ]
});

module.exports = {
    logger
}