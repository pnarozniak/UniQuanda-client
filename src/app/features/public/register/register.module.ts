import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
	declarations: [RegisterComponent],
})
export class RegisterModule {}
