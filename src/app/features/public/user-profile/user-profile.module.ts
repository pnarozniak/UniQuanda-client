import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { UserProfileComponent } from './user-profile.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
	imports: [CommonModule, RouterModule, ToastrModule.forRoot()],
	declarations: [UserProfileComponent, HeaderComponent],
})
export class UserProfileModule {}
