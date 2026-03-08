import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ToolbarComponent } from '../../../../shared/ui/components/toolbar-component/toolbar-component';
import { InvoiceItemDto } from '../../../../core/models/invoice.model';
import { InvoiceService } from '../../../../core/services/invoice.service';
import { InvoiceTable } from '../../components/invoice-table/invoice-table';
import { InvoiceEventsService } from '../../../../core/services/invoice-events.service';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ButtonModule, ToolbarModule, ToolbarComponent, InvoiceTable],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  providers: [InvoiceService]
})
export class Dashboard {
  
  private readonly invoiceService = inject(InvoiceService);
  private readonly invoiceEventsService = inject(InvoiceEventsService);

  

  ngOnInit(): void {
    this.getInvoices();
  }

  private getInvoices():void {
    this.invoiceService.getAll().subscribe(invoices => {
      this.invoiceEventsService.emitUpdateInvoices(invoices);
    });
  }
}
