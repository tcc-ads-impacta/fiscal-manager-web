import { Component, ElementRef, inject, ViewChild } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InvoiceService } from '../../../../core/services/invoice.service';
import { InvoiceItemDto, InvoicePayload } from '../../../../core/models/invoice.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-invoice-form',
  imports: [
    InputTextModule,
    InputNumberModule,
    DatePickerModule,
    ButtonModule,
    ReactiveFormsModule],
  templateUrl: './invoice-form.html',
  styleUrl: './invoice-form.css'

})
export class InvoiceForm {
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  private readonly fb = inject(FormBuilder);
  private readonly invoiceService = inject(InvoiceService);
  private readonly messageService = inject(MessageService);
  private readonly dialogRef = inject(DynamicDialogRef);
  private readonly dialogConfig = inject(DynamicDialogConfig);

  selectedFile: File | null = null;
  editingInvoice: InvoiceItemDto | null = null;
  isEditMode = false;

  invoiceForm = this.fb.nonNullable.group({
    description: ['', [Validators.required, Validators.minLength(3)]],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    date: [new Date(), Validators.required]
  });

  ngOnInit(): void {
    const invoice = this.dialogConfig.data?.invoice as InvoiceItemDto | undefined;
    if (!invoice) return;

    this.editingInvoice = invoice;
    this.isEditMode = true;

    this.invoiceForm.patchValue({
      description: invoice.description,
      amount: invoice.amount,
      date: new Date(invoice.date)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files && input.files.length > 0 ? input.files[0] : null;    
  }

  onSubmit(): void {
    // if (this.invoiceForm.invalid || !this.selectedFile) return;
    if (this.invoiceForm.invalid) return;
    if (!this.isEditMode && !this.selectedFile) return;

    const formValues = this.invoiceForm.getRawValue();

    const payload: InvoicePayload = {
      description: formValues.description,
      amount: Number(formValues.amount.toFixed(2)),
      date: formValues.date.toISOString(),
      file: this.selectedFile ?? undefined
    };

    const request$ = this.isEditMode && this.editingInvoice
      ? this.invoiceService.update(this.editingInvoice.id, payload)
      : this.invoiceService.create(payload);

    request$.subscribe({
      next: (savedInvoice) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: this.isEditMode ? 'Nota fiscal atualizada.' : 'Nota fiscal salva.'
        });

        this.invoiceForm.reset({
          description: '',
          amount: 0,
          date: new Date()
        });

        this.selectedFile = null;
        if (this.fileInput?.nativeElement) {
          this.fileInput.nativeElement.value = '';
        }

        this.dialogRef.close({
          status: 'saved',
          data: savedInvoice

        });

      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erro', detail: e.message || 'Falha na comunicação com a API.' })
    });

  }



}
