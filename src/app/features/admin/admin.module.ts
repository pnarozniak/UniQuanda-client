import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
	imports: [CommonModule, AdminRoutingModule],
	declarations: [AdminComponent],
})
export class AdminModule {}
