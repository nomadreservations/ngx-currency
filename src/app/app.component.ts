import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  public form: FormGroup;
  public value: number;
  public ngxCurrencyOptions = {
    prefix: 'R$ ',
    thousands: '.',
    decimal: ',',
    allowNegative: false,
    nullable: true
  };

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      value: [null]
    });
  }
}
