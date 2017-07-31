import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {RequestRecoverPasswordPresenter, RequestRecoverPassword} from "../../presenters/request-recover-password.presenter";
import {SubscriptionFunction} from "../../utils/global";
import {Subject} from "rxjs";
import {newEventReceiver} from "../../utils/newEventReceiver";
import {RequestRecoverPasswordService} from "../../services/request-recover-password.service";
import {RequestRecoverPasswordDataDTO, RequestRecoverPasswordSuccessDTO} from "../../dtos/RequestRecoverPasswordDTOs";
import {ErrorDTO} from "../../dtos/ErrorDTOs";

class RequestRecoverPasswordView implements RequestRecoverPassword {
  public onRequestRecoverPassword: SubscriptionFunction<RequestRecoverPasswordDataDTO>;


  private onSubmitEvent = new Subject<RequestRecoverPasswordDataDTO>();
  private actionButtonName: string = 'Recuperar contraseña';

  constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
    this.onRequestRecoverPassword = newEventReceiver(this.onSubmitEvent);
  }

  onRequested(user: RequestRecoverPasswordSuccessDTO) {
    this.router.navigate(['/login']);
  }

  onRequestRecoverPasswordError(loginError: ErrorDTO) {
    this.actionButtonName = 'Recuperar contraseña';
    // error should be displayed
  }

  onSubmit(user: RequestRecoverPasswordDataDTO) {
    this.actionButtonName = 'Enviando...'
    this.onSubmitEvent.next(user);
  }
}

@Component({
  selector: 'request-recover-password',
  templateUrl: 'request-recover-password.view.html',
  styleUrls: ['request-recover-password.view.scss']
})
export default class RequestRecoverPasswordViewRoute extends RequestRecoverPasswordView {
  constructor(protected requestRecoverPasswordService: RequestRecoverPasswordService, protected activatedRoute: ActivatedRoute, protected router: Router) {
    super(router, activatedRoute);
    new RequestRecoverPasswordPresenter(this, requestRecoverPasswordService);
  }
}