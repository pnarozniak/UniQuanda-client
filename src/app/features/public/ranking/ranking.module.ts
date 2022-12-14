import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingComponent } from './ranking.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RankingRoutingModule } from './ranking.routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { RankingNavigationComponent } from './components/ranking-navigation/ranking-navigation.component';
import { RankingGlobalComponent } from './pages/ranking-global/ranking-global.component';
import { RankingTagComponent } from './pages/ranking-tag/ranking-tag.component';
import { RankingUserBoxComponent } from './components/ranking-user-box/ranking-user-box.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		RankingRoutingModule,
		MatTabsModule,
		MatTooltipModule,
	],
	declarations: [
		RankingComponent,
		RankingNavigationComponent,
		RankingGlobalComponent,
		RankingTagComponent,
		RankingUserBoxComponent,
	],
})
export class RankingModule {}
