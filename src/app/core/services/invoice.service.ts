import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { InvoiceItemDto, InvoicePayload } from '../models/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/invoices`;

  getAll(month?: number, year?: number): Observable<InvoiceItemDto[]> {

    let params = {};

    if(month && year) {
      params = {month, year}      
    }

    return this.http.get<InvoiceItemDto[]>(this.baseUrl, {params})
  }
  
  create(payload: InvoicePayload): Observable<InvoiceItemDto> {
    const formData = this.buildFormData(payload);
    return this.http.post<InvoiceItemDto>(this.baseUrl, formData);
  }

  update(id: number, payload: InvoicePayload): Observable<InvoiceItemDto> {
    const formData = this.buildFormData(payload);
    return this.http.put<InvoiceItemDto>(`${this.baseUrl}/${id}`, formData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  private buildFormData(payload: InvoicePayload): FormData {
    const formData = new FormData();
    formData.append('Description', payload.description);
    // Conversão explícita para string para garantir compatibilidade com FormData
    formData.append('Amount', payload.amount.toString());
    formData.append('Date', payload.date);
    
    if (payload.file) {
      formData.append('File', payload.file);
    }
    return formData;
  }
}
