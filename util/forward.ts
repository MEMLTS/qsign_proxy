import axios, { type AxiosRequestConfig, type Method } from "axios";
import { config } from "@config/config";

/**
 * 转发请求到签名服务
 * @param path 请求路径
 * @param payload 请求数据
 * @param method HTTP方法，默认为POST
 * @param options 额外的请求配置选项
 * @returns Promise<any> 响应数据
 */
export async function forwardToSignService(
    path: string,
    payload: any,
    method: Method = "POST",
    options: Partial<AxiosRequestConfig> = {}
): Promise<any> {
    try {
        const url = `${config.sign.baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;

        const defaultConfig: AxiosRequestConfig = {
            method,
            url,
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            },
            timeout: options.timeout || 5000,
            ...options
        };

        if (method.toUpperCase() === 'GET') {
            defaultConfig.params = payload;
        } else {
            defaultConfig.data = payload;
        }

        const response = await axios(defaultConfig);

        return {
            success: true,
            data: response.data,
            status: response.status,
            headers: response.headers
        };

    } catch (error: any) {
        const errorInfo = {
            success: false,
            error: error.message,
            status: error.response?.status,
            data: error.response?.data,
            url: `${config.sign.baseUrl}/${path}`
        };
        throw errorInfo;
    }
}