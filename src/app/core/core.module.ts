import { HandleErrorService } from './services/handle-error.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StorageService } from './services/storage.service';
import { UserDataService } from './services/user-data.service';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HeaderDropdownComponent } from './components/header-dropdown/header-dropdown.component';
import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoaderComponent } from './components/loader/loader.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RecaptchaInterceptor } from './interceptors/recaptcha.interceptor';
import { MatMenuModule } from '@angular/material/menu';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { AccessTokenInterceptor } from './interceptors/access-token.interceptor';
import { RefreshTokenService } from './services/refresh-token.service';

@NgModule({
	providers: [
		StorageService,
		UserDataService,
		HandleErrorService,
		RefreshTokenService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorHandlerInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AccessTokenInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: RecaptchaInterceptor,
			multi: true,
		},
		{
			provide: RECAPTCHA_V3_SITE_KEY,
			useValue: environment.recaptcha.siteKey,
		},
	],
	declarations: [
		HeaderComponent,
		NavBarComponent,
		HeaderDropdownComponent,
		NotFoundComponent,
		LoaderComponent,
	],
	imports: [
		RouterModule,
		ToastrModule.forRoot({
			timeOut: 3500,
			positionClass: 'toast-bottom-right',
			tapToDismiss: false,
			closeButton: true,
			maxOpened: 3,
		}),
		HttpClientModule,
		CommonModule,
		BrowserModule,
		SharedModule,
		TooltipModule.forRoot(),
		OverlayModule,
		RecaptchaV3Module,
		MatMenuModule,
	],
	exports: [HeaderComponent, NavBarComponent],
})
export class CoreModule {}
