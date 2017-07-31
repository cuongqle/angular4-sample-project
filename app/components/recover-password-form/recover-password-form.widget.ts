import {Component, Input, Output, EventEmitter} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'recover-password-form',
  templateUrl: 'recover-password-form.widget.html',
  styleUrls: ['recover-password-form.widget.scss']
})
export default class RecoverPasswordFormWidget {
  private recoverPasswordForm: FormGroup;
  private isValidPassword: boolean = true;

  @Input() actionButtonName: string;
  @Output() onSubmitEvent: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
  }

  checkPassword() {
    this.isValidPassword = true;
    if(this.recoverPasswordForm.controls['password'].value != this.recoverPasswordForm.controls['confirmPassword'].value) {
      this.isValidPassword = false;
    }
  }

  onRecover(value: any) {
    this.onSubmitEvent.next(value);
  }

  ngOnInit() {
    this.recoverPasswordForm = this.formBuilder.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
    });
  }
}