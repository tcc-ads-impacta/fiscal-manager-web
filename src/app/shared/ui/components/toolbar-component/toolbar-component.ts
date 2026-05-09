import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';

import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InvoiceForm } from '../../../../features/invoices/components/invoice-form/invoice-form';
import { debounceTime, distinctUntilChanged, Subject, take, takeUntil } from 'rxjs';
import { InvoiceEventsService } from '../../../../core/services/invoice-events.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-toolbar-component',
  imports: [ToolbarModule, AvatarModule, ButtonModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './toolbar-component.html',
  styleUrl: './toolbar-component.css',
  providers: [DialogService]
})  
export class ToolbarComponent {

  @Output() searchChange = new EventEmitter<string>();
  private readonly dialogService = inject(DialogService);
  private readonly invoiceEventsService = inject(InvoiceEventsService);
  private readonly destroyRef = inject(DestroyRef);
  
  private readonly searchSubject = new Subject<string>();

  private dialogRef?: DynamicDialogRef | null;

  
  constructor() {
    this.searchSubject
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(value => {
        this.searchChange.emit(value);
      });
    
  }

  new(): void {    
    this.dialogRef = this.dialogService.open(InvoiceForm, {
      header: 'Cadastrar nota fiscal',
      closable: true,
      closeOnEscape: true,
      dismissableMask: true,
      maskStyleClass: "dialog-mask-blur",
      modal: true,
    });

    this.dialogRef?.onClose.pipe(take(1)).subscribe(result => {
      if (!result) return;

      if (result?.status === 'saved') {
        // Atualizar lista
        this.invoiceEventsService.emitRefreshInvoices();
      }
    });
  }

  search(value: string): void {
    this.searchSubject.next(value);
  }


}
