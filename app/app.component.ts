import {Component, ViewEncapsulation} from "@angular/core";
const logger = require('debug')('app:component:app');

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}
