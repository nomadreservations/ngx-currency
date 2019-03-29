import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from './currency-mask.config';
import { CurrencyMaskDirective } from './currency-mask.directive';

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [ CurrencyMaskDirective ],
  exports: [ CurrencyMaskDirective ]
})
export class NgxCurrencyModule {
  static forRoot(config: CurrencyMaskConfig): ModuleWithProviders {
    return {
      ngModule: NgxCurrencyModule,
      providers: [{
        provide: CURRENCY_MASK_CONFIG,
        useValue: config,
      }]
    };
  }
}
