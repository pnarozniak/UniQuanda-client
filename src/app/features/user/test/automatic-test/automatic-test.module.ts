import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { AutomaticTestRoutingModule } from './automatic-test-routing.module';
import { AutomaticTestComponent } from './automatic-test.component';

@NgModule({
	declarations: [AutomaticTestComponent],
	imports: [CommonModule, AutomaticTestRoutingModule, SharedModule],
})
export class AutomaticTestModule {}
