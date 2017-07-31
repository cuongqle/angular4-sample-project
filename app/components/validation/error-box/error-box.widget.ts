import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
    selector: 'error-box',
    templateUrl: 'error-box.widget.html',
    styleUrls: ['error-box.widget.scss']
})
export default class ErrorBoxWidget {
    @Input() visible: boolean = false;
    @Output() onCloseEvent: EventEmitter<any> = new EventEmitter();

    onGotit($event) {
        this.onCloseEvent.next($event);
    }
}
