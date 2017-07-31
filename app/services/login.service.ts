import {Injectable, Optional, state} from "@angular/core";
import {RequestEvent, ResponseError, ResponseEvent, Server} from "./gateway/axios.gateway";
import {newEventReceiver} from "../utils/newEventReceiver";
import StatelessPipeline from "./pipelines/StatelessPipeline";
import {LoginDataDTO, LoginSuccessDTO} from "../dtos/LoginDTOs";
import {UserTokenDataDTO, UserTokenSuccessDTO} from "../dtos/UserTokenDTOs";

@Injectable()
export class LoginService {
  public userLogged: Function;
  public errorOnLogin: Function;
  private loginUserPipe: StatelessPipeline<LoginDataDTO, LoginSuccessDTO>;

  //TODO temporal solution to persist session
  private token = null

  constructor(@Optional() private server?: Server) {
    this.server = this.server || Server.local();
    this.loginUserPipe = StatelessPipeline.post<LoginDataDTO, LoginSuccessDTO>(this.server);
    this.userLogged = newEventReceiver(this.loginUserPipe.mapToResponse());
    this.errorOnLogin = newEventReceiver(this.loginUserPipe.catchError().map((resp: ResponseError) => resp.data));

    this.userLogged((user: LoginSuccessDTO) => {
      localStorage.setItem('token', this.token);
    });
  }

  loginUser(userToLogin: LoginDataDTO): void {
    this.token = btoa(userToLogin.username + ':' + userToLogin.password)

    const request: RequestEvent<any> = {
      resource: '/api/auth/login',
      headers:  {
        'Accept': 'application/json;charset=UTF-8',
        'Authorization': 'Basic ' + this.token
      },
      payload: {
        'username': userToLogin.username
      }
    };
    this.loginUserPipe.next(request);
  }

  checkToken(userToken: UserTokenDataDTO) {
    const request: RequestEvent<any> = {
      resource: '/api/auth/check-token',
      payload: {
        'userId': userToken.userId,
        'token': userToken.token
      }
    };
    this.loginUserPipe.next(request);
  }

  checkTokenObservable(userToken: UserTokenDataDTO) {
    const request: RequestEvent<any> = {
      resource: '/api/auth/check-token',
      payload: {
        'userId': userToken.userId,
        'token': userToken.token
      }
    };
    return this.server.post(request)
        .map((resp: ResponseEvent<UserTokenDataDTO, UserTokenSuccessDTO>) => resp.response)
  }
}