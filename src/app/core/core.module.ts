import { HandleErrorService } from './services/handle-error.service';
import { HandleErrorInterceptorService } from './interceptors/handle-error-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
	providers: [
		HandleErrorService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HandleErrorInterceptorService,
			multi: true,
		},
	],
})
export class CoreModule {}
