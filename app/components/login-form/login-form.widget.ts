import {Component, Input, Output, EventEmitter} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'login-form',
  templateUrl: 'login-form.widget.html',
  styleUrls: ['login-form.widget.scss']
})
export default class LoginFormWidget {
  private loginForm: FormGroup;

  @Input() error: string;
  @Input() userExist: boolean;
  @Input() actionButtonName: string;
  @Output() onSubmitEvent: EventEmitter<any> = new EventEmitter();
  @Output() onCheckUserEvent: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
  }

  onLogin(value: any) {
    this.onSubmitEvent.next(value);
  }

  onCheckUser() {
    if (this.loginForm.controls['username'].valid) {
      this.onCheckUserEvent.next({username: this.loginForm.controls['username'].value});
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.email],
        password: ['', Validators.required]
    });
  }
}