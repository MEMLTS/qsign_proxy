import { LoggerFactory } from '@lib/Logger';
import Server from '@app/server';
import { config } from '@config/config';

LoggerFactory.getLogger();

Logger.info('Starting server...');

new Server(
    config.server.host,
    config.server.port
).start();