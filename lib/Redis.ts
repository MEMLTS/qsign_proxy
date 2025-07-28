import { createClient, RedisClientType } from 'redis';

/**
 * Redis数据库操作类
 * 提供常用的Redis操作方法
 */
class Redis {
    private client: RedisClientType;

    /**
     * 构造函数
     * @param options Redis连接配置选项
     */
    constructor(options?: {
        url?: string;
        host?: string;
        port?: number;
        password?: string;
        db?: number;
    }) {
        // 构建Redis连接配置
        const redisOptions: any = {};

        if (options?.url) {
            redisOptions.url = options.url;
        } else {
            redisOptions.socket = {
                host: options?.host || 'localhost',
                port: options?.port || 6379
            };
            if (options?.password) {
                redisOptions.password = options.password;
            }
            if (options?.db !== undefined) {
                redisOptions.database = options.db;
            }
        }

        this.client = createClient(redisOptions);

        // 监听错误事件
        this.client.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });
    }

    /**
     * 连接到Redis服务器
     * @returns Promise<void>
     */
    async connect(): Promise<void> {
        try {
            await this.client.connect();
            console.log('Redis connected successfully');
        } catch (error) {
            console.error('Failed to connect to Redis:', error);
            throw error;
        }
    }

    /**
     * 断开Redis连接
     * @returns Promise<void>
     */
    async disconnect(): Promise<void> {
        try {
            await this.client.quit();
            console.log('Redis disconnected successfully');
        } catch (error) {
            console.error('Error disconnecting from Redis:', error);
            throw error;
        }
    }

    /**
     * 测试Redis连接状态
     * @returns Promise<string> 返回"PONG"表示连接正常
     */
    async ping(): Promise<string> {
        return await this.client.ping();
    }

    // ==================== 字符串操作 ====================

    /**
     * 获取字符串类型的值
     * @param key 键名
     * @returns Promise<string | null> 返回值或null（如果不存在）
     */
    async get(key: string): Promise<string | null> {
        return await this.client.get(key);
    }

    /**
     * 设置字符串类型的值
     * @param key 键名
     * @param value 值
     * @param options 可选配置 { EX: 过期时间(秒), PX: 过期时间(毫秒) }
     * @returns Promise<string | null> 成功返回'OK'
     */
    async set(key: string, value: string, options?: { EX?: number; PX?: number }): Promise<string | null> {
        if (options) {
            return await this.client.set(key, value, options);
        }
        return await this.client.set(key, value);
    }

    /**
     * 删除一个或多个键
     * @param keys 键名列表
     * @returns Promise<number> 被删除的键数量
     */
    async del(...keys: string[]): Promise<number> {
        return await this.client.del(keys);
    }

    /**
     * 检查键是否存在
     * @param key 键名
     * @returns Promise<number> 存在返回1，不存在返回0
     */
    async exists(key: string): Promise<number> {
        return await this.client.exists(key);
    }

    /**
     * 设置键的过期时间
     * @param key 键名
     * @param seconds 过期时间（秒）
     * @returns Promise<number> 成功返回1，失败返回0
     */
    async expire(key: string, seconds: number): Promise<number> {
        return await this.client.expire(key, seconds);
    }

    // ==================== 哈希操作 ====================

    /**
     * 获取哈希表中所有字段和值
     * @param key 哈希表键名
     * @returns Promise<Record<string, string>> 字段-值对对象
     */
    async getHash(key: string): Promise<Record<string, string>> {
        return await this.client.hGetAll(key);
    }

    /**
     * 设置哈希表字段值
     * @param key 哈希表键名
     * @param field 字段名
     * @param value 值
     * @returns Promise<number> 如果字段是新增的返回1，如果字段已存在且被更新返回0
     */
    async setHashField(key: string, field: string, value: string): Promise<number> {
        return await this.client.hSet(key, field, value);
    }

    /**
     * 批量设置哈希表字段值
     * @param key 哈希表键名
     * @param value 字段-值对对象
     * @returns Promise<number> 设置的字段数量
     */
    async setHash(key: string, value: Record<string, string>): Promise<number> {
        return await this.client.hSet(key, value);
    }

    /**
     * 获取哈希表字段值
     * @param key 哈希表键名
     * @param field 字段名
     * @returns Promise<string | null> 字段值或null
     */
    async getHashField(key: string, field: string): Promise<string | null> {
        return await this.client.hGet(key, field);
    }

    /**
     * 删除哈希表字段
     * @param key 哈希表键名
     * @param fields 字段名列表
     * @returns Promise<number> 被删除的字段数量
     */
    async delHashField(key: string, ...fields: string[]): Promise<number> {
        return await this.client.hDel(key, fields);
    }

    // ==================== 集合操作 ====================

    /**
     * 获取集合所有成员
     * @param key 集合键名
     * @returns Promise<string[]> 集合成员数组
     */
    async getSet(key: string): Promise<string[]> {
        return await this.client.sMembers(key);
    }

    /**
     * 向集合添加成员
     * @param key 集合键名
     * @param members 成员列表
     * @returns Promise<number> 添加的成员数量
     */
    async setSet(key: string, members: string[]): Promise<number> {
        return await this.client.sAdd(key, members);
    }

    /**
     * 向集合添加单个成员
     * @param key 集合键名
     * @param member 成员
     * @returns Promise<number> 如果成员是新添加的返回1，如果已存在返回0
     */
    async addSetMember(key: string, member: string): Promise<number> {
        return await this.client.sAdd(key, member);
    }

    /**
     * 检查成员是否在集合中
     * @param key 集合键名
     * @param member 成员
     * @returns Promise<number> 存在返回1，不存在返回0
     */
    async isSetMember(key: string, member: string): Promise<number> {
        return await this.client.sIsMember(key, member);
    }

    /**
     * 获取集合成员数量
     * @param key 集合键名
     * @returns Promise<number> 集合大小
     */
    async getSetSize(key: string): Promise<number> {
        return await this.client.sCard(key);
    }

    // ==================== 列表操作 ====================

    /**
     * 获取列表指定范围的元素
     * @param key 列表键名
     * @param start 开始索引
     * @param end 结束索引 (-1表示最后一个元素)
     * @returns Promise<string[]> 元素数组
     */
    async getList(key: string, start: number = 0, end: number = -1): Promise<string[]> {
        return await this.client.lRange(key, start, end);
    }

    /**
     * 向列表左侧（头部）添加元素
     * @param key 列表键名
     * @param values 元素列表
     * @returns Promise<number> 操作后列表长度
     */
    async lpush(key: string, values: string[]): Promise<number> {
        return await this.client.lPush(key, values);
    }

    /**
     * 向列表右侧（尾部）添加元素
     * @param key 列表键名
     * @param values 元素列表
     * @returns Promise<number> 操作后列表长度
     */
    async rpush(key: string, values: string[]): Promise<number> {
        return await this.client.rPush(key, values);
    }

    /**
     * 获取列表长度
     * @param key 列表键名
     * @returns Promise<number> 列表长度
     */
    async getListLength(key: string): Promise<number> {
        return await this.client.lLen(key);
    }

    /**
     * 获取并移除列表左侧第一个元素
     * @param key 列表键名
     * @returns Promise<string | null> 元素值或null
     */
    async lpop(key: string): Promise<string | null> {
        return await this.client.lPop(key);
    }

    /**
     * 获取并移除列表右侧最后一个元素
     * @param key 列表键名
     * @returns Promise<string | null> 元素值或null
     */
    async rpop(key: string): Promise<string | null> {
        return await this.client.rPop(key);
    }

    // ==================== 工具方法 ====================

    /**
     * 获取Redis客户端实例（用于执行其他未封装的方法）
     * @returns RedisClientType
     */
    getClient(): RedisClientType {
        return this.client;
    }

    /**
     * 清空当前数据库
     * @returns Promise<string>
     */
    async flushDB(): Promise<string> {
        return await this.client.flushDb();
    }
}

export default Redis;