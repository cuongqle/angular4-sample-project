import {NgModule, ApplicationRef} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {AxiosGateway} from "./services/gateway/axios.gateway";
import {createNewHosts, removeNgStyles} from "@angularclass/hmr/dist/helpers";
import PipesModule from "./shared/pipes/pipes.module";
import {routing} from "./app.routing";
import HelloWorldComponent from "./HelloWorldComponent";
import {LoginService} from "./services/login.service";
import {CheckUserExistService} from "./services/check-user-exist.service";
import {RecoverPasswordService} from "./services/recover-password.service";
// import {MaterialModule} from '@angular/material';
import LoginFormWidget from "./components/login-form/login-form.widget";
import RecoverPasswordFormWidget from "./components/recover-password-form/recover-password-form.widget";
import LoginViewRoute from "./views/login/login.view";
import RecoverPasswordViewRoute from "./views/recover-password/recover-password.view";
import { MaterializeModule } from "angular2-materialize";
import RequestRecoverPasswordViewRoute from "./views/request-recover-password/request-recover-password.view";
import RequestRecoverPasswordFormWidget from "./components/request-recover-password-form/request-recover-password-form.widget";
import {RequestRecoverPasswordService} from "./services/request-recover-password.service";
import {CheckTokenResolver} from "./services/resolvers/check-token.resolver";
import ErrorBoxWidget from "./components/validation/error-box/error-box.widget";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    // MaterialModule,
    MaterializeModule,
    PipesModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    HelloWorldComponent,
    LoginFormWidget,
    RecoverPasswordFormWidget,
    LoginViewRoute,
    RecoverPasswordViewRoute,
    RequestRecoverPasswordViewRoute,
    RequestRecoverPasswordFormWidget,
    ErrorBoxWidget
  ],
  providers: [
    AxiosGateway,
    CheckUserExistService,
    LoginService,
    RecoverPasswordService,
    RequestRecoverPasswordService,
    CheckTokenResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {
  }

  hmrOnInit(store: any) {
    console.clear();
  }

  hmrOnDestroy(store: any) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    store.disposeOldHosts = createNewHosts(cmpLocation);
    removeNgStyles();
  }

  hmrAfterDestroy(store: any) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
