import { Routes } from '@angular/router';
import { Dashboard } from './features/invoices/pages/dashboard/dashboard';

export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'dashboard', component: Dashboard },
    { path: '**', redirectTo: 'dashboard' }
];
