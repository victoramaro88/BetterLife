// Import PrimeNG modules
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CpfMaskPipe } from './services/cpf-mask.pipe';
import { BlockUIModule } from 'primeng/blockui';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    CpfMaskPipe,
    BlockUIModule
  ],
  exports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    CpfMaskPipe,
    BlockUIModule
  ],
  providers: [provideNgxMask()]
})
export class ImportsModule {}
