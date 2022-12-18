import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
		children: [
			{
				path: '',
				redirectTo: 'title-requests',
				pathMatch: 'full',
			},
			{
				path: 'title-requests',
				loadChildren: () =>
					import('./titles-requests/titles-requests.module').then(
						(m) => m.TitlesRequestsModule
					),
				data: { title: 'Podania o nadania tytułu' },
			},
		],
	},
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
