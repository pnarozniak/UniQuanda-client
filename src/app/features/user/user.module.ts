import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
	imports: [CommonModule, UserRoutingModule],
	declarations: [UserComponent],
})
export class UserModule {}
