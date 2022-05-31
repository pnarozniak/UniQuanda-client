import { NgModule } from '@angular/core';
import { TokensService } from './services/tokens.service';
import { UserDataService } from './services/user-data.service';

@NgModule({
	providers: [TokensService, UserDataService],
})
export class CoreModule {}
