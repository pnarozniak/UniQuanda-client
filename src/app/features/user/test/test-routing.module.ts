import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./tests-dashboard/tests-dashboard.module').then(
				(m) => m.TestsDashboardModule
			),
		pathMatch: 'full',
	},
	{
		path: ':idTest',
		loadChildren: () =>
			import('./test-view/test-view.module').then((m) => m.TestViewModule),
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TestRoutingModule {}
