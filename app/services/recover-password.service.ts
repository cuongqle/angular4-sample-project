import {Injectable, Optional} from "@angular/core";
import {Server, RequestEvent, ResponseError} from "./gateway/axios.gateway";
import {newEventReceiver} from "../utils/newEventReceiver";
import StatelessPipeline from "./pipelines/StatelessPipeline";
import {RecoverPasswordDataDTO, RecoverPasswordSuccessDTO} from "../dtos/RecoverPasswordDTOs";

@Injectable()
export class RecoverPasswordService {
  public passwordRecovered: Function;
  public errorOnRecoverPassword: Function;
  private recoverPasswordPipe: StatelessPipeline<RecoverPasswordDataDTO, RecoverPasswordSuccessDTO>;

  constructor(@Optional() private server?: Server) {
    this.server = this.server || Server.local();
    this.recoverPasswordPipe = StatelessPipeline.post<RecoverPasswordDataDTO, RecoverPasswordSuccessDTO>(this.server);
    this.passwordRecovered = newEventReceiver(this.recoverPasswordPipe.mapToResponse());
    this.errorOnRecoverPassword = newEventReceiver(this.recoverPasswordPipe.catchError().map((resp: ResponseError) => resp.data));
  }

  changePassword(recoverPassword: RecoverPasswordDataDTO): void {
    const request: RequestEvent<RecoverPasswordDataDTO> = {
      resource: '/api/auth/change-password',
      payload: recoverPassword
    };

    this.recoverPasswordPipe.next(request);
  }
}
