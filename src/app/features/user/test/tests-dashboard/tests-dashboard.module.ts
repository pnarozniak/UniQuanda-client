import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { TestsDashboardRoutingModule } from './tests-dashboard-routing.module';
import { TestsDashboardComponent } from './tests-dashboard.component';
import { TestsHistoryComponent } from './components/tests-history/tests-history.component';

@NgModule({
	declarations: [TestsDashboardComponent, TestsHistoryComponent],
	imports: [CommonModule, TestsDashboardRoutingModule, SharedModule],
})
export class TestsDashboardModule {}
