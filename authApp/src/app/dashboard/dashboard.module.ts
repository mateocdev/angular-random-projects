import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

@NgModule({
  declarations: [DashboardLayoutComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
