import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitlesRequestsComponent } from './titles-requests.component';

const routes: Routes = [
	{
		path: '',
		component: TitlesRequestsComponent,
	},
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TitlesRequestRoutingModule {}
