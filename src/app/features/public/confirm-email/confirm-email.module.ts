import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmEmailComponent } from './confirm-email.component';
import { ConfirmEmailApiService } from './services/confirm-email-api.service';
import { RouterModule } from '@angular/router';
import { ConfirmEmailRoutingModule } from './confirm-email-routing.module';

@NgModule({
	declarations: [ConfirmEmailComponent],
	imports: [CommonModule, RouterModule, ConfirmEmailRoutingModule],
	providers: [ConfirmEmailApiService],
})
export class ConfirmEmailModule {}
