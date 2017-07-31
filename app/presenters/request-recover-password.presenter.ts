import {RequestRecoverPasswordService} from "../services/request-recover-password.service";

export interface RequestRecoverPassword {
  onRequestRecoverPassword: Function;
  onRequested: Function;
  onRequestRecoverPasswordError: Function;
}

export class RequestRecoverPasswordPresenter {
  constructor(private requestRecoverPasswordView: RequestRecoverPassword,
              private requestRecoverPasswordService:RequestRecoverPasswordService) {
    this.requestRecoverPasswordView.onRequestRecoverPassword(this.requestRecoverPasswordService.requestRecoverPassword.bind(this.requestRecoverPasswordService));
    this.requestRecoverPasswordService.passwordRecovered(this.requestRecoverPasswordView.onRequested.bind(this.requestRecoverPasswordView));
    this.requestRecoverPasswordService.errorOnRequestRecoverPassword(this.requestRecoverPasswordView.onRequestRecoverPasswordError.bind(this.requestRecoverPasswordView));
  }
}
