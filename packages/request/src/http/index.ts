import Axios, { AxiosInstance, AxiosRequestConfig, Method } from "axios";

import { GreetingResponse } from "../types";

// 相关配置请参考：http://www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  // 请求超时时间
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
};

class HttpInstance {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  /** 保存当前Axios实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    HttpInstance.axiosInstance.interceptors.request.use(
      async (config): Promise<any> => {
        // 滤除body参数data中作为空字符串 null的部分
        if (typeof config.data === "object") {
          Object.keys(config.data).forEach((key: string) => {
            if (config.data[key] === "" || config.data[key] === null) {
              delete config.data[key];
            }
          });
        }
        // TODO 注入token token判断 ...
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = HttpInstance.axiosInstance;
    instance.interceptors.response.use(
      (response) => {
        const systemResponse: GreetingResponse = response.data;
        if (!systemResponse) {
          const error_msg = "服务器响应数据格式不正确，请检查服务器配置";
          console.error(error_msg);
          return Promise.reject(error_msg);
        }

        const { success } = systemResponse;
        if (!success) {
          console.error("success is false");
          return Promise.reject(success);
        }
        return response.data.data;
      },
      (error) => {
        const $error = error;
        $error.isCancelRequest = Axios.isCancel($error);
        // 所有的响应异常 区分来源为取消请求/非取消请求
        console.error($error);
        return Promise.reject($error);
      },
    );
  }

  /** 通用请求工具函数 */
  public request<T>(
    method: Method,
    url: string,
    axiosConfig?: AxiosRequestConfig,
  ): Promise<T> {
    const config = {
      method,
      url,
      ...axiosConfig,
    };

    // 单独处理自定义请求/响应回调
    return new Promise((resolve, reject) => {
      HttpInstance.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /** 单独抽离的post工具函数 */
  public post<P>(url: string, config?: AxiosRequestConfig): Promise<P> {
    return this.request<P>("post", url, config);
  }

  /** 单独抽离的get工具函数 */
  public get<P>(url: string, config?: AxiosRequestConfig): Promise<P> {
    return this.request<P>("get", url, config);
  }
}

export const http = new HttpInstance();
