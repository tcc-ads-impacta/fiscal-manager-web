import { Component, inject } from '@angular/core';

import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InvoiceForm } from '../../../../features/invoices/components/invoice-form/invoice-form';
import { take } from 'rxjs';


@Component({
  selector: 'app-toolbar-component',
  imports: [ToolbarModule, AvatarModule, ButtonModule],
  templateUrl: './toolbar-component.html',
  styleUrl: './toolbar-component.css',
  providers: [DialogService]
})  
export class ToolbarComponent {

  private readonly dialogService = inject(DialogService);
  private dialogRef?: DynamicDialogRef | null;

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
        
      }
    });
  }
  
}
