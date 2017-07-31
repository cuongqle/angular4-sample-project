import {RecoverPasswordService} from "../services/recover-password.service";

export interface RecoverPassword {
  onRecoverPassword: Function;
  onRecovered: Function;
  onRecoverPasswordError: Function;
}

export class RecoverPasswordPresenter {
  constructor(private recoverPasswordView: RecoverPassword,
              private recoverPasswordService:RecoverPasswordService) {
    this.recoverPasswordView.onRecoverPassword(this.recoverPasswordService.changePassword.bind(this.recoverPasswordService));
    this.recoverPasswordService.passwordRecovered(this.recoverPasswordView.onRecovered.bind(this.recoverPasswordView));
    this.recoverPasswordService.errorOnRecoverPassword(this.recoverPasswordView.onRecoverPasswordError.bind(this.recoverPasswordView));
  }
}
