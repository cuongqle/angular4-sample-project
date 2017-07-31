import {Component, Input, Output, EventEmitter} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'request-recover-password-form',
  templateUrl: 'request-recover-password-form.widget.html',
  styleUrls: ['request-recover-password-form.widget.scss']
})
export default class RequestRecoverPasswordFormWidget {
  private requestRecoverPasswordForm: FormGroup;

  @Input() actionButtonName: string;
  @Output() onSubmitEvent: EventEmitter<any> = new EventEmitter();

  private EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

  constructor(private formBuilder: FormBuilder) {
  }

  onSubmit(value: any) {
    this.onSubmitEvent.next(value);
  }

  ngOnInit() {
    this.requestRecoverPasswordForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(this.EMAIL_REGEXP)]]
    });
  }
}