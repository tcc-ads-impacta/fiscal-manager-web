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
import { startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-invoice-table',
  imports: [TableModule, ButtonModule, AsyncPipe, TagModule, CurrencyPipe, DatePipe],
  templateUrl: './invoice-table.html',
  styleUrl: './invoice-table.css'
})
export class InvoiceTable {

  private readonly invoiceService = inject(InvoiceService);
  private readonly invoiceEventsService = inject(InvoiceEventsService);
  private readonly destroyRef = inject(DestroyRef);

  invoicesList$ = this.invoiceEventsService.refreshInvoices$.pipe(
    startWith(void 0),
    switchMap(() => this.invoiceService.getAll())
  );

  ngOnInit(): void {
    // this.invoiceEventsService.refreshInvoices$
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe(() => {
    //     this.invoicesList$ = this.invoiceService.getAll();

    //   });
  }

  delete(invoice: InvoiceItemDto) {
    this.invoiceService.delete(invoice.id).subscribe(() => {
      console.log(`Invoice with id ${invoice.id} deleted successfully.`);
      this.invoiceEventsService.emitRefreshInvoices();
    });
  }

}
