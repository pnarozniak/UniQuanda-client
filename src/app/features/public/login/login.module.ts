import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { OAuthComponent } from './pages/oauth/oauth.component';
import { LoginRoutingModule } from './login-routing.module';
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		ToastrModule.forRoot(),
		SharedModule,
		LoginRoutingModule,
	],
	declarations: [LoginComponent, OAuthComponent],
})
export class LoginModule {}
