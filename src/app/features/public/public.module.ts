import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public-routing.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';

@NgModule({
	imports: [CommonModule, PublicRoutingModule, LoginModule, RegisterModule],
	declarations: [PublicComponent],
})
export class PublicModule {}
