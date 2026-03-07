import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ToolbarComponent } from '../../../../shared/ui/components/toolbar-component/toolbar-component';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ButtonModule, ToolbarModule, ToolbarComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  
}
