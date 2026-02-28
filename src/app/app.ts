import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InvoiceForm } from './features/invoices/components/invoice-form/invoice-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, InvoiceForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('fiscal-manager');
}
