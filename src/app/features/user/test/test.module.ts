import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [TestComponent],
	imports: [CommonModule, TestRoutingModule, SharedModule],
})
export class TestModule {}
