import { Component, ElementRef, inject, ViewChild } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InvoiceService } from '../../../../core/services/invoice.service';
import { InvoicePayload } from '../../../../core/models/invoice.model';


@Component({
  selector: 'app-invoice-form',
  imports: [
    ToastModule,
    InputTextModule,
    InputNumberModule,
    DatePickerModule,
    ButtonModule,
    ReactiveFormsModule],
  templateUrl: './invoice-form.html',
  styleUrl: './invoice-form.css',
  providers: [MessageService]
})
export class InvoiceForm {
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;
  
  private readonly fb = inject(FormBuilder);
  private readonly invoiceService = inject(InvoiceService);
  private readonly messageService = inject(MessageService);

  selectedFile: File | null = null;

  invoiceForm = this.fb.nonNullable.group({
    description: ['', [Validators.required, Validators.minLength(3)]],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    date: [new Date(), Validators.required]
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  onSubmit(): void {
    if (this.invoiceForm.invalid || !this.selectedFile) return;

    const formValues = this.invoiceForm.getRawValue();

    // Converte o objeto Date do p-calendar para string ISO 8601 exigida pelo C#
    const isoDate = formValues.date.toISOString();

    const amount = Number(formValues.amount.toFixed(2));

    const payload: InvoicePayload = {
      description: formValues.description,
      amount: amount,
      date: isoDate,
      file: this.selectedFile
    };

    this.invoiceService.create(payload).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Nota fiscal salva.' });
        this.invoiceForm.reset({
          description: '',
          amount: 0,
          date: new Date()
        });

        this.selectedFile = null;
        this.selectedFile = null;
        if (this.fileInput?.nativeElement) {
          this.fileInput.nativeElement.value = '';
        }
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erro', detail: e.message || 'Falha na comunicação com a API.' })
    });

  }



}
