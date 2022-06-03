import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PremiumComponent } from './premium.component';
import { PremiumRoutingModule } from './premium-routing.module';

@NgModule({
	imports: [CommonModule, PremiumRoutingModule],
	declarations: [PremiumComponent],
})
export class PremiumModule {}
