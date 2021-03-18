/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { loginRequest } from '../models/loginRequest';
import type { loginResponse } from '../models/loginResponse';
import type { whoamiRequest } from '../models/whoamiRequest';
import type { whoamiResponse } from '../models/whoamiResponse';
import { request as __request } from '../core/request';

export class Service {

    /**
     * @param requestBody
     * @returns loginResponse 200 response
     * @throws ApiError
     */
    public static async login(
        requestBody: loginRequest,
    ): Promise<loginResponse> {
        const result = await __request({
            method: 'POST',
            path: `/login`,
            body: requestBody,
        });
        return result.body;
    }

    /**
     * @param requestBody
     * @returns whoamiResponse 200 response
     * @throws ApiError
     */
    public static async whoami(
        requestBody: whoamiRequest,
    ): Promise<whoamiResponse> {
        const result = await __request({
            method: 'GET',
            path: `/whoami`,
            body: requestBody,
        });
        return result.body;
    }

}