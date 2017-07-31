import {Injectable, Optional} from "@angular/core";
import {Server, RequestEvent, ResponseError} from "./gateway/axios.gateway";
import {newEventReceiver} from "../utils/newEventReceiver";
import StatelessPipeline from "./pipelines/StatelessPipeline";
import {RequestRecoverPasswordDataDTO, RequestRecoverPasswordSuccessDTO} from "../dtos/RequestRecoverPasswordDTOs";

@Injectable()
export class RequestRecoverPasswordService {
  public passwordRecovered: Function;
  public errorOnRequestRecoverPassword: Function;
  private requestRecoverPasswordPipe: StatelessPipeline<RequestRecoverPasswordDataDTO, RequestRecoverPasswordSuccessDTO>;

  constructor(@Optional() private server?: Server) {
    this.server = this.server || Server.local();
    this.requestRecoverPasswordPipe = StatelessPipeline.post<RequestRecoverPasswordDataDTO, RequestRecoverPasswordSuccessDTO>(this.server);
    this.passwordRecovered = newEventReceiver(this.requestRecoverPasswordPipe.mapToResponse());
    this.errorOnRequestRecoverPassword = newEventReceiver(this.requestRecoverPasswordPipe.catchError().map((resp: ResponseError) => resp.data));
  }

  requestRecoverPassword(requestRecoverPassword: RequestRecoverPasswordDataDTO): void {
    const request: RequestEvent<RequestRecoverPasswordDataDTO> = {
      resource: '/api/auth/request-reset-password',
      payload: requestRecoverPassword
    };

    this.requestRecoverPasswordPipe.next(request);
  }
}
