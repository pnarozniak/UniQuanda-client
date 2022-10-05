import { NgModule } from '@angular/core';
import { LoadingDirective } from './directives/loading.directive';
import { ThemeDirective } from './directives/theme.directive';

@NgModule({
	declarations: [ThemeDirective, LoadingDirective],
	exports: [ThemeDirective, LoadingDirective],
})
export class SharedModule {}
