import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	imports: [CommonModule, TestRoutingModule, SharedModule],
})
export class TestModule {}
