import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagsComponent } from './tags.component';

const routes: Routes = [
	{
		path: '**',
		component: TagsComponent,
		data: { title: 'Lista tagów' },
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [],
})
export class TagsRoutingModule {}
