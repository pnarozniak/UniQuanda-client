import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	imports: [CommonModule, AdminRoutingModule, SharedModule],
	declarations: [AdminComponent, AdminHeaderComponent],
	bootstrap: [AdminComponent],
})
export class AdminModule {}
