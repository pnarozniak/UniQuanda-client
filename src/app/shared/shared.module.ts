import { NgModule } from '@angular/core';
import { ThemeDirective } from './directives/theme.directive';

@NgModule({
	declarations: [ThemeDirective],
	exports: [ThemeDirective],
})
export class SharedModule {}
