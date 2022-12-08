import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppTitleService } from './app-title.service';
import '@angular/common/locales/global/pl';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		CoreModule,
		SharedModule,
	],
	providers: [AppTitleService, { provide: LOCALE_ID, useValue: 'pl' }],
	bootstrap: [AppComponent],
})
export class AppModule {}
