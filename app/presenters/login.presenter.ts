import {LoginService} from "../services/login.service";
import {CheckUserExistService} from "../services/check-user-exist.service";

export interface UserLogin {
  onCheckUserExist: Function;
  onUserLogin: Function;
  onChecked: Function;
  onLogged: Function;
  onLoginError: Function;
}

export class LoginPresenter {
  constructor(private loginView: UserLogin,
              private checkUserService: CheckUserExistService,
              private loginService: LoginService) {
    this.loginView.onUserLogin(this.loginService.loginUser.bind(this.loginService));
    this.loginService.userLogged(this.loginView.onLogged.bind(this.loginView));
    this.loginService.errorOnLogin(this.loginView.onLoginError.bind(this.loginView));
    this.loginView.onCheckUserExist(this.checkUserService.checkExist.bind(this.checkUserService));            
    this.checkUserService.checked(this.loginView.onChecked.bind(this.loginView))
  }
}