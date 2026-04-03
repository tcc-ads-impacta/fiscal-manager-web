import { Component, DestroyRef, inject } from '@angular/core';
import { InvoiceEventsService } from '../../../../core/services/invoice-events.service';
import { InvoiceItemDto } from '../../../../core/models/invoice.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AsyncPipe } from '@angular/common';
import { InvoiceService } from '../../../../core/services/invoice.service';
import { TagModule } from 'primeng/tag';
import { CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common'; 
import { startWith, switchMap, take } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InvoiceForm } from '../invoice-form/invoice-form';

@Component({
  selector: 'app-invoice-table',
  imports: [TableModule, ButtonModule, AsyncPipe, TagModule, CurrencyPipe, DatePipe],
  templateUrl: './invoice-table.html',
  styleUrl: './invoice-table.css',
  providers: [DialogService]
})
export class InvoiceTable {

  private readonly invoiceService = inject(InvoiceService);
  private readonly invoiceEventsService = inject(InvoiceEventsService);
  private readonly destroyRef = inject(DestroyRef);
  private dialogRef?: DynamicDialogRef | null;
  private readonly dialogService = inject(DialogService);

  invoicesList$ = this.invoiceEventsService.refreshInvoices$.pipe(
    startWith(void 0),
    switchMap(() => this.invoiceService.getAll())
  );
  
  delete(invoice: InvoiceItemDto) {
    this.invoiceService.delete(invoice.id).subscribe(() => {
      console.log(`Invoice with id ${invoice.id} deleted successfully.`);
      this.invoiceEventsService.emitRefreshInvoices();
    });
  }

  edit(invoice: InvoiceItemDto) {


    this.dialogRef = this.dialogService.open(InvoiceForm, {
      header: 'Editar nota fiscal',
      closable: true,
      closeOnEscape: true,
      dismissableMask: true,
      maskStyleClass: "dialog-mask-blur",
      modal: true,
      data: { invoice }

    });

    this.dialogRef?.onClose.pipe(take(1)).subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result?.status === 'saved') {
        this.invoiceEventsService.emitRefreshInvoices();
      }
    });
  }

}
