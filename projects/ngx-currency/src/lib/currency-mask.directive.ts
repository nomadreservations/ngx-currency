import { AfterViewInit, Directive, DoCheck, ElementRef, forwardRef, HostListener, Inject, Input, KeyValueDiffer, KeyValueDiffers, OnInit, Optional } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from './currency-mask.config';
import { InputHandler } from './input.handler';

export const CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line
  useExisting: forwardRef(() => CurrencyMaskDirective),
  multi: true,
};

@Directive({
    selector: '[currencyMask]',
    providers: [CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR]
})
export class CurrencyMaskDirective implements AfterViewInit, ControlValueAccessor, DoCheck, OnInit {

  @Input() options: any = {};

  public inputHandler: InputHandler;
  public keyValueDiffer: KeyValueDiffer<any, any>;

  public optionsTemplate = {
      align: 'right',
      allowNegative: true,
      allowZero: true,
      decimal: '.',
      precision: 2,
      prefix: '$ ',
      suffix: '',
      thousands: ',',
      nullable: false
  };

  constructor(@Optional() @Inject(CURRENCY_MASK_CONFIG) private currencyMaskConfig: CurrencyMaskConfig,
              private elementRef: ElementRef,
              private keyValueDiffers: KeyValueDiffers) {
    if (currencyMaskConfig) {
        this.optionsTemplate = currencyMaskConfig;
    }

    this.keyValueDiffer = keyValueDiffers.find({}).create();
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.style.textAlign = this.options ? this.options.align : this.optionsTemplate.align;
  }

  ngDoCheck() {
    if (this.keyValueDiffer.diff(this.options)) {
      this.elementRef.nativeElement.style.textAlign = this.options.align ? this.options.align : this.optionsTemplate.align;
      this.inputHandler.updateOptions((Object as any).assign({}, this.optionsTemplate, this.options));
    }
  }

  ngOnInit() {
    this.inputHandler = new InputHandler(this.elementRef.nativeElement, (Object as any).assign({}, this.optionsTemplate, this.options));
  }

  @HostListener('blur', ['$event'])
  handleBlur(event: any) {
    this.inputHandler.getOnModelTouched().apply(event);
  }

  @HostListener('cut', ['$event'])
  handleCut(event: any) {
    if (!this.isChromeAndroid()) {
      this.inputHandler.handleCut(event);
    }
  }

  @HostListener('input', ['$event'])
  handleInput(event: any) {
    if (this.isChromeAndroid()) {
      this.inputHandler.handleInput(event);
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeydown(event: any) {
    if (!this.isChromeAndroid()) {
      this.inputHandler.handleKeydown(event);
    }
  }

  @HostListener('keypress', ['$event'])
  handleKeypress(event: any) {
    if (!this.isChromeAndroid()) {
      this.inputHandler.handleKeypress(event);
    }
  }

  @HostListener('paste', ['$event'])
  handlePaste(event: any) {
    if (!this.isChromeAndroid()) {
      this.inputHandler.handlePaste(event);
    }
  }

  isChromeAndroid(): boolean {
    return /chrome/i.test(navigator.userAgent) && /android/i.test(navigator.userAgent);
  }

  registerOnChange(callbackFunction: (event: any) => any): void {
    this.inputHandler.setOnModelChange(callbackFunction);
  }

  registerOnTouched(callbackFunction: (event: any) => any): void {
    this.inputHandler.setOnModelTouched(callbackFunction);
  }

  setDisabledState(value: boolean): void {
    this.elementRef.nativeElement.disabled = value;
  }

  writeValue(value: number): void {
    this.inputHandler.setValue(value);
  }
}