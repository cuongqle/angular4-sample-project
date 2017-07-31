import {Injectable, Optional} from "@angular/core";
import {Server, RequestEvent, ResponseError} from "./gateway/axios.gateway";
import {newEventReceiver} from "../utils/newEventReceiver";
import StatelessPipeline from "./pipelines/StatelessPipeline";
import {CheckUserExistDataDTO, CheckUserExistSuccessDTO} from "../dtos/CheckUserExistDTOs";

@Injectable()
export class CheckUserExistService {
  public checked: Function;
  public errorOnCheck: Function;
  private checkerPipe: StatelessPipeline<CheckUserExistDataDTO, CheckUserExistSuccessDTO>;

  constructor(@Optional() private server?: Server) {
    this.server = this.server || Server.local();
    this.checkerPipe = StatelessPipeline.post<CheckUserExistDataDTO, CheckUserExistSuccessDTO>(this.server);
    this.checked = newEventReceiver(this.checkerPipe.mapToResponse());
    this.errorOnCheck = newEventReceiver(this.checkerPipe.catchError().map((resp: ResponseError) => resp.data));
  }

  checkExist(entity: CheckUserExistDataDTO): void {
    const request: RequestEvent<CheckUserExistDataDTO> = {
      resource: '/api/username/check',
      payload: entity
    };

    this.checkerPipe.next(request);
  }
}
