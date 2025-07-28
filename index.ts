import { LoggerFactory } from '@lib/Logger';
import Server from '@app/server';
import { config } from '@config/config';
import Redis from '@lib/Redis';

LoggerFactory.getLogger();

Logger.info('Starting server...');

Logger.info("Redis server connecting...")

Redis.connect();

new Server(
    config.server.host,
    config.server.port
).start();