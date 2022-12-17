import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test.component';

const routes: Routes = [
	{
		path: '',
		component: TestComponent,
	},
	{
		path: 'automatic',
		loadChildren: () =>
			import('./automatic-test/automatic-test.module').then(
				(m) => m.AutomaticTestModule
			),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TestRoutingModule {}
