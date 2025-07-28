import axios from "axios";
import { config } from "@config/config";

export async function forwardToSignService(path: string, payload: any): Promise<any> {
    return await axios.post(`${config.sign.baseUrl}/${path}`, payload, {
        headers: {
            "Content-Type": "application/json",
        },
        timeout: 5000,
    });
}
