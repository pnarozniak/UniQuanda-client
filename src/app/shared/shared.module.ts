import { NgModule } from '@angular/core';
import { ThemeDirective } from './directives/theme.directive';
import { InputComponent } from './components/input/input.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { IconComponent } from './components/icon/icon.component';

const sharedComponents = [InputComponent, ButtonComponent, IconComponent];

const sharedModules = [CommonModule];

const sharedDirectives = [ThemeDirective];

@NgModule({
	imports: [sharedModules, MatInputModule, ReactiveFormsModule],
	declarations: [sharedDirectives, sharedComponents],
	exports: [sharedDirectives, sharedModules, sharedComponents],
})
export class SharedModule {}
