import {Injectable, Optional} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {Observer} from "rxjs/Observer";
import config from "../../config/config";
import axios, {AxiosRequestConfig} from "axios";
const logger = require('debug')('app:gateway:axios');

//region: using type merging:
export type ServerMethod<T,V>=(resource: string, observer?: Observer<T>) => Observable<V>;
export type ServerMethodPayload<T,V>=(resource: string, payload: T, observer?: Observer<T>) => Observable<V>;
export type ResponseGateway<T,V>=ResponseError|ResponseEvent<T, V>;

export interface ResponseError {
  data: any;
  stack: any;
}

export interface RequestEvent<T> {
  resource: string,
  headers?: any,
  payload?: T,
  auth?: boolean
}

export interface ResponseEvent<T, V> {
  request: RequestEvent<T>,
  response?: V,
  error?: ResponseError
}

export interface Server {
  get<T,V>(request: RequestEvent<T>, observer?: Observer<T>): Observable<ResponseEvent<T, V>|ResponseError>;
  post<T,V>(request: RequestEvent<T>, observer?: Observer<T>): Observable<ResponseEvent<T, V>|ResponseError>;
  put<T,V>(request: RequestEvent<T>, observer?: Observer<T>): Observable<ResponseEvent<T, V>|ResponseError>;
  del<T,V>(request: RequestEvent<T>, observer?: Observer<T>): Observable<ResponseEvent<T, V>|ResponseError>;
}

export abstract class Server {
  static local(): Server {
    return new AxiosGateway(config.protocol + config.host + config.port);
  }

  static test(timeout: number = 1000): Server {
    return new AxiosGateway('http://localhost:9001', timeout);
  }
}

//endregion
@Injectable()
export class AxiosGateway implements Server {
  constructor(private serverHost: string = 'http://localhost:9001/', @Optional() private timeout?: number) {
    this.timeout = timeout || 5000;
  }

  private request<T, V>(requestEvent: RequestEvent<T>, method: string): Observable<ResponseGateway<T, V>> {



    const header = requestEvent.auth? {'Content-Type': "application/json", 'Accept': "application/json;charset=UTF-8", 'Authorization': 'Basic ' + localStorage.getItem('token')} : requestEvent.headers ;

    const config: AxiosRequestConfig = {
      baseURL: this.serverHost,
      timeout: this.timeout,
      method: method,
      headers: header,
      url: requestEvent.resource,
      data: requestEvent.payload || null
    };

    console.log("calling resource [", config.url, "] of socketServer: [", this.serverHost, "]", config);
    logger("calling resource [", config.url, "] of socketServer: [", this.serverHost, "]", config);
    return Observable
      .of(config)
      .flatMap(config => axios.request(config))
      .retry(0)
      .pluck('data')
      .do((resp: any) => {
        logger("returned from call for resource: ", config.url, JSON.stringify(resp));
      })
      .map((data) => (<ResponseEvent<T, V>> {
        request: requestEvent,
        response: data
      }))
      .catch((error) => {
        return Observable.of<ResponseError>({
          stack: error,
          data: error.response ? error.response.data : 'Uncaught exception'
        });
      });
  }

  private manageResponse<T,V>(observable: Observable<ResponseGateway<T, V>>, resource: string, observer: Observer<ResponseGateway<T, V>>|null): Observable<ResponseGateway<T, V>> {
    if (observer) {
      observable.first().subscribe(
        (value: ResponseGateway<T, V>) => {
          observer.next(value);
        },
        (error: any) => {
          console.error("call to: ", resource, "failed:", error);
          observer.error(error);
        },
        () => {
        }
      );
    }
    return observable;
  }

  get<T,V>(requestEvent: RequestEvent<T>, observer: Observer<ResponseGateway<T, V>>|null = null): Observable<ResponseGateway<T, V>> {
    return this.manageResponse(this.request<T, V>(requestEvent, 'get'), requestEvent.resource, observer);
  }

  post<T,V>(requestEvent: RequestEvent<T>, observer: Observer<ResponseGateway<T, V>>|null = null): Observable<ResponseGateway<T, V>> {
    return this.manageResponse(this.request<T, V>(requestEvent, 'post'), requestEvent.resource, observer);
  }

  put<T,V>(requestEvent: RequestEvent<T>, observer: Observer<ResponseGateway<T, V>>|null = null): Observable<ResponseGateway<T, V>> {
    return this.manageResponse(this.request<T, V>(requestEvent, 'put'), requestEvent.resource, observer);
  }

  del<T,V>(requestEvent: RequestEvent<T>, observer: Observer<ResponseGateway<T, V>>|null = null): Observable<ResponseGateway<T, V>> {
    return this.manageResponse(this.request<T, V>(requestEvent, 'delete'), requestEvent.resource, observer);
  }
}
