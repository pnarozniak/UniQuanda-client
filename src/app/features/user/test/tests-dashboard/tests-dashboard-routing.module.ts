import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestsDashboardComponent } from './tests-dashboard.component';

const routes: Routes = [
	{
		path: '',
		component: TestsDashboardComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TestsDashboardRoutingModule {}
