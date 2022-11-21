import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsComponent } from './tags.component';
import { TagsRoutingModule } from './tags.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TagOnListComponent } from './tag-on-list/tag-on-list.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
	imports: [
		CommonModule,
		TagsRoutingModule,
		SharedModule,
		ReactiveFormsModule,
		MatMenuModule,
	],
	declarations: [TagsComponent, TagOnListComponent],
})
export class TagsModule {}
