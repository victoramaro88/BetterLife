// Import PrimeNG modules
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CpfMaskPipe } from './services/cpf-mask.pipe';
import { BlockUIModule } from 'primeng/blockui';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    CpfMaskPipe,
    BlockUIModule,
    CalendarModule,
    InputTextModule,
    DropdownModule,
    InputSwitchModule,
    FileUploadModule,
    ToastModule,
    TableModule
  ],
  exports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    CpfMaskPipe,
    BlockUIModule,
    CalendarModule,
    InputTextModule,
    DropdownModule,
    InputSwitchModule,
    FileUploadModule,
    ToastModule,
    TableModule
  ],
  providers: [provideNgxMask()]
})
export class ImportsModule {}
