import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginPresenter, UserLogin} from "../../presenters/login.presenter";
import {SubscriptionFunction} from "../../utils/global";
import {Subject} from "rxjs";
import {newEventReceiver} from "../../utils/newEventReceiver";
import {LoginService} from "../../services/login.service";
import {CheckUserExistService} from "../../services/check-user-exist.service";
import {LoginDataDTO, LoginSuccessDTO} from "../../dtos/LoginDTOs";
import {CheckUserExistDataDTO, CheckUserExistSuccessDTO} from "../../dtos/CheckUserExistDTOs";
import {ErrorDTO} from "../../dtos/ErrorDTOs";

class LoginView implements UserLogin {
  public onUserLogin: SubscriptionFunction<LoginDataDTO>;
  public onCheckUserExist: SubscriptionFunction<CheckUserExistDataDTO>;

  private onCheckUserEvent = new Subject<CheckUserExistDataDTO>();
  private onSubmitEvent = new Subject<LoginDataDTO>();
  private actionButtonName: string = 'Iniciando sesión';
  private userExist: boolean = true;
  private error: ErrorDTO;
  
  constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
    this.onUserLogin = newEventReceiver(this.onSubmitEvent);
    this.onCheckUserExist = newEventReceiver(this.onCheckUserEvent);
  }

  onLogged(user: LoginSuccessDTO) {
    this.error = null;
    this.router.navigate(['/admission/pre/member']);
  }

  onChecked(result: CheckUserExistSuccessDTO) {
    this.userExist = result.exist;
  }

  onLoginError(loginError: ErrorDTO) {
    this.error = loginError;
    this.actionButtonName = 'Iniciando sesión';
  }

  onCheckUser(value: CheckUserExistDataDTO) {
    this.userExist = true;
    this.onCheckUserEvent.next(value);
  }

  onSubmit(user: LoginDataDTO) {
    this.actionButtonName = 'Iniciando sesión...'
    this.onSubmitEvent.next(user);
  }
}

@Component({
  selector: 'login',
  templateUrl: 'login.view.html',
  styleUrls: ['login.view.scss']
})
export default class LoginViewRoute extends LoginView {
  constructor(loginService: LoginService, checkUserService: CheckUserExistService, protected activatedRoute: ActivatedRoute, protected router: Router) {
    super(router, activatedRoute);
    new LoginPresenter(this, checkUserService, loginService);
  }
}