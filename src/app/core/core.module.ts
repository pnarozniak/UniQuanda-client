import { HandleErrorService } from './services/handle-error.service';
import { HandleErrorInterceptorService } from './interceptors/handle-error-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StorageService } from './services/storage.service';
import { UserDataService } from './services/user-data.service';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
	providers: [
		StorageService,
		UserDataService,
		HandleErrorService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HandleErrorInterceptorService,
			multi: true,
		},
	],
	declarations: [HeaderComponent],
	imports: [RouterModule, ToastrModule.forRoot(), HttpClientModule],
	exports: [HeaderComponent],
})
export class CoreModule {}
