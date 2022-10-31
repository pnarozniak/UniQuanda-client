import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';

const routes: Routes = [
	{
		path: ':id',
		component: UserProfileComponent,
		data: { title: 'Ładowanie profilu...' },
	},
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UserProfileRoutingModule {}
