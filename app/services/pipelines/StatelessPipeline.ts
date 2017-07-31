import {Observable, Subject} from "rxjs/Rx";
import {Subscribable} from "rxjs/Observable";
import {Server, RequestEvent, ResponseEvent, ResponseError} from "../gateway/axios.gateway";

export default class StatelessPipeline<T, V> implements Subscribable<ResponseEvent<T,V>> {
  private pipeline: Subject<RequestEvent<T>> = new Subject<RequestEvent<T>>();
  private observable: Observable<ResponseEvent<T,V>|ResponseError>;

  constructor(private fn: (requestEvent: RequestEvent<T>) => Observable<ResponseEvent<T, V>|ResponseError>) {
    this.observable = this.pipeline
      .flatMap((requestEv: RequestEvent<T>) => {
        return fn(requestEv);
      })
      .share();
  }

  run(resource: RequestEvent<T>): void {
    this.pipeline.next(resource);
  }

  next(resource: RequestEvent<T>): void {
    this.run(resource);
  }

  mapToResponse(): Observable<V> {
    return this.observable.filter(x => !x.hasOwnProperty('stack')).map((r: ResponseEvent<T, V>) => <V>r.response)
  }

  catchError(): Observable<ResponseError> {
    return this.observable.filter(x => x.hasOwnProperty('stack'));
  }

  subscribe(cb: ((value: ResponseEvent<T, V>) => void), error?: (error: any) => void, complete?: () => void) {
    return this.observable.subscribe(cb);
  }

  asObservable(): Observable<ResponseEvent<T, V>> {
    return this.observable;
  }

  static post<T, V>(server: Server): StatelessPipeline<T, V> {
    return new StatelessPipeline<T, V>(server.post.bind(server))
  }

  static put<T, V>(server: Server): StatelessPipeline<T, V> {
    return new StatelessPipeline<T, V>(server.put.bind(server))
  }

  static get<T, V>(server: Server): StatelessPipeline<T, V> {
    return new StatelessPipeline<T, V>(server.get.bind(server))
  }

  static del<T, V>(server: Server): StatelessPipeline<T, V> {
    return new StatelessPipeline<T, V>(server.del.bind(server))
  }
}
