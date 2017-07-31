import {NgModule} from "@angular/core";
import {SafePipe} from "./safe.pipe";
import {KeysPipe} from "./keys.pipe";

const pipes = [
  SafePipe,
  KeysPipe
];

@NgModule({
  declarations: pipes,
  exports: pipes
})
export default class PipesModule {

}
