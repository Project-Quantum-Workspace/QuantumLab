import { request } from '@umijs/max';
import type { AxiosError, Method, ResponseType } from 'axios'


export class BaseApi {
  private loadBy(
    url: string,
    method: Method,
    data?: object,
    responseType: ResponseType = 'json',
    withCredentials: boolean = true,
    headers?: Record<string, string>
  ) {
    return request(url, {
      method,
      data,
      responseType,
      withCredentials,
      headers
    }).then((response) => response)
    .catch((error: AxiosError) => { throw error });
  }

  loadByGet(
    url: string,
    withCredentials?: boolean,
    headers?: Record<string, string>
  ) {
    return this.loadBy(url, 'GET', undefined, undefined, withCredentials, headers)
  }

  loadByPost(
    url: string,
    data?: object,
    responseType?: ResponseType,
    withCredentials?: boolean,
    headers?: Record<string, string>
  ) {
    return this.loadBy(url, 'POST', data, responseType, withCredentials, headers)
  }

  loadByDelete(url: string) {
    return this.loadBy(url, 'DELETE')
  }

  loadbyPatch(url: string, data?: object) {
    return this.loadBy(url, 'PATCH', data)
  }
}
