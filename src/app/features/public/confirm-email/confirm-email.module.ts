import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmEmailComponent } from './confirm-email.component';
import { ConfirmEmailApiService } from './services/confirm-email-api.service';

@NgModule({
	declarations: [ConfirmEmailComponent],
	imports: [CommonModule],
	providers: [ConfirmEmailApiService],
})
export class ConfirmEmailModule {}
