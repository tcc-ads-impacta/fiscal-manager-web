import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { InvoiceItemDto } from '../models/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceEventsService {
  private readonly updateInvoicesSubject = new BehaviorSubject<InvoiceItemDto[]>([]);
  private readonly refreshInvoicesSubject = new Subject<void>();

  // Componente B escuta daqui
  readonly updateInvoices$: Observable<InvoiceItemDto[]> =
    this.updateInvoicesSubject.asObservable();

  // Componente A publica aqui
  emitUpdateInvoices(invoices: InvoiceItemDto[]): void {
    this.updateInvoicesSubject.next(invoices);
  }

  readonly refreshInvoices$: Observable<void> = this.refreshInvoicesSubject.asObservable();

  emitRefreshInvoices(): void {
    this.refreshInvoicesSubject.next();
  }


}
