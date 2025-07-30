export const config = {
    sign: {
        baseUrl: 'http://localhost:5800',
        cmd: "blacklist" // blacklist or whitelist
    },
    admin: {
        token: "114514"
    },
    redis: {
        host: "192.168.1.7",
        port: 6379,
        password: "redis_TZQY6e",
        db: 0
    },
    server: {
        port: 3010,
        host: "0.0.0.0"
    },
    log: {
        level: "info"
    }
}