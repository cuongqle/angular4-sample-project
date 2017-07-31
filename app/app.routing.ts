import {RouterModule, Routes} from "@angular/router";
import LoginViewRoute from "./views/login/login.view";
import RecoverPasswordViewRoute from "./views/recover-password/recover-password.view";
import RequestRecoverPasswordViewRoute from "./views/request-recover-password/request-recover-password.view";
import {CheckTokenResolver} from "./services/resolvers/check-token.resolver";

const routes: Routes = [
  {
    path: '',
    component: LoginViewRoute
  },
  {
    path: 'login',
    component: LoginViewRoute
  },
  {
    path: 'request-recover-password',
    component: RequestRecoverPasswordViewRoute
  },
  {
    path: 'recover-password/:userId/:token',
    component: RecoverPasswordViewRoute,
    resolve: {
      resolvedCheckToken: CheckTokenResolver
    }
  }
];

export const routing = RouterModule.forRoot(routes);
