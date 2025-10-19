import { refresh } from "@/entities/auth/api/authService";
import { ERouteNames } from "@/shared";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { RequestOptions } from "https";

export class AxiosClient {
  private baseQueryV1Instance: AxiosInstance;

  constructor(baseURL: string, withAuth = false) {
    const config: AxiosRequestConfig = {
      baseURL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    this.baseQueryV1Instance = axios.create(config);

    if (withAuth) {
      this.addAuthResponseInterceptor();
    }
  }

  private redirectToAuth() {
    // Перенаправляем на страницу авторизации
    window.location.href = `/${ERouteNames.AUTH_ROUTE}/${ERouteNames.LOGIN_ROUTE}`;
  }

  public addAuthResponseInterceptor() {
    let isRefreshing = false;
    this.baseQueryV1Instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401  && !originalRequest._retry) {
          originalRequest._retry = true;
          if (isRefreshing) {
            await new Promise((resolve) => {
              const interval = setInterval(() => {
                if (!isRefreshing) {
                  clearInterval(interval);
                  resolve("");
                }
              }, 100);
            });
          }

          isRefreshing = true;

          try {
            await refresh();
            isRefreshing = false;
            return this.baseQueryV1Instance(originalRequest);
          } catch (error) {
            isRefreshing = false;
            // Если не удалось обновить токен, перенаправляем на авторизацию
            this.redirectToAuth();
            return Promise.reject(error);
          }
        }

        // Если это другая ошибка 401, перенаправляем на авторизацию
        if (error.response?.status === 401 || error.response?.status === 403) {
          this.redirectToAuth();
        }

        return Promise.reject(error);
      }
    );
  }

  private handleResponse<T>(response: AxiosResponse<T>): AxiosResponse<T> {
    return response;
  }

  private handleError(error: AxiosError<{ message?: string }>): never {
    const message = error.response?.data?.message || error.message || "Error";
    throw new Error(message);
  }

  public async get<T>(
    url: string,
    params: Omit<RequestOptions, "body"> = {}
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.baseQueryV1Instance.get<T>(url, { params });
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error as AxiosError<{ message?: string }>);
    }
  }

  public async post<T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.baseQueryV1Instance.post<T>(
        url,
        data,
        config
      );
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error as AxiosError<{ message?: string }>);
    }
  }

  public async put<T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.baseQueryV1Instance.put<T>(url, data, config);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error as AxiosError<{ message?: string }>);
    }
  }

  public async patch<T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.baseQueryV1Instance.patch<T>(
        url,
        data,
        config
      );
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error as AxiosError<{ message?: string }>);
    }
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.baseQueryV1Instance.delete<T>(url, config);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error as AxiosError<{ message?: string }>);
    }
  }
}

export const axiosNoAuth = new AxiosClient("http://localhost:8080/api/v1");
export const axiosAuth = new AxiosClient("http://localhost:8080/api/v1", true);
