import Koa from 'koa';
import cors from '@koa/cors';
import log from '@middleware/logger';
import routers from '@router/index';
import KoaBody from 'koa-body';

export default class Server {
    private app: Koa;
    private port: number;
    private host: string;

    constructor(host: string, port: number) {
        this.app = new Koa();
        this.port = port || 3000;
        this.host = host || '0.0.0.0';
    }

    public start(): void {
        this.app.use(cors());
        this.app.use(log);

        for (const router of routers) {
            this.app.use(router.routes());
            this.app.use(router.allowedMethods());
        }
        this.app.use(KoaBody());
        this.app.listen(this.port, this.host, () => {
            Logger.info(`Server listening on port ${this.port}`);
        });
    }
}