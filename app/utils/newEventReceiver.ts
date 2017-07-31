import {Subscribable} from "rxjs/Observable";

export function newEventReceiver<T>(subject:Subscribable<T>) {
  return subject.subscribe.bind(subject);
}
