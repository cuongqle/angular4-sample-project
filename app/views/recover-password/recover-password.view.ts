import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {RecoverPassword, RecoverPasswordPresenter} from "../../presenters/recover-password.presenter";
import {SubscriptionFunction} from "../../utils/global";
import {Subject} from "rxjs";
import {newEventReceiver} from "../../utils/newEventReceiver";
import {RecoverPasswordService} from "../../services/recover-password.service";
import {RecoverPasswordDataDTO, RecoverPasswordSuccessDTO} from "../../dtos/RecoverPasswordDTOs";
import {ErrorDTO} from "../../dtos/ErrorDTOs";

class RecoverPasswordView implements RecoverPassword {
  public onRecoverPassword: SubscriptionFunction<RecoverPasswordDataDTO>;
  private recoverPasswordData: RecoverPasswordDataDTO;

  private onSubmitEvent = new Subject<RecoverPasswordDataDTO>();
  private actionButtonName: string = 'Recuperar contraseña';

  constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
    this.onRecoverPassword = newEventReceiver(this.onSubmitEvent);
    this.recoverPasswordData = this.activatedRoute.snapshot.data['resolvedCheckToken'];
    if(this.recoverPasswordData == null || this.recoverPasswordData.token == "") this.router.navigate(['/login']);
  }

  onRecovered(user: RecoverPasswordSuccessDTO) {
    this.router.navigate(['/login']);
  }

  onRecoverPasswordError(loginError: ErrorDTO) {
    this.actionButtonName = 'Recuperar contraseña';
    // error should be displayed
  }

  onSubmit(recoverPassword: RecoverPasswordDataDTO) {
    this.recoverPasswordData.password = recoverPassword.password;
    this.actionButtonName = 'Cambiando contraseña...'
    this.onSubmitEvent.next(this.recoverPasswordData);
  }


}

@Component({
  selector: 'recover-password',
  templateUrl: 'recover-password.view.html',
  styleUrls: ['recover-password.view.scss']
})
export default class RecoverPasswordViewRoute extends RecoverPasswordView {
  constructor(protected recoverPasswordService: RecoverPasswordService, protected activatedRoute: ActivatedRoute, protected router: Router) {
    super(router, activatedRoute);
    new RecoverPasswordPresenter(this, recoverPasswordService);
  }
}