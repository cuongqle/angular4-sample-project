import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Rx';

import {AdmissionFormService} from "../admission-forms.service";
import {LoginService} from "../login.service";

@Injectable()
export class CheckTokenResolver implements Resolve<any> {
    constructor(private loginService: LoginService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.loginService.checkTokenObservable({userId: route.params['userId'], token: route.params['token']});
    }
}
