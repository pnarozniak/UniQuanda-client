import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of, Subscription, tap } from 'rxjs';
import { RankingType } from '../../enums/ranking-type.enum';
import { Location } from '@angular/common';
import {
	GetRankingRequestDTO,
	IGetRankingResponseDTO,
	IGetRankingResponseDTOUser,
} from '../../models/get-ranking.model';
import { GetRankingApiService } from '../../services/get-ranking.api.service';

@Component({
	selector: 'app-ranking-navigation',
	templateUrl: './ranking-navigation.component.html',
	styleUrls: ['./ranking-navigation.component.scss'],
})
export class RankingNavigationComponent implements OnInit, OnDestroy {
	public activePage = RankingType.Global;
	public allTabs: RankingType[] = [RankingType.Global, RankingType.Tag];
	public tagId: number | null = null;
	private readonly _subscription = new Subscription();

	// global ranking map (page, users)
	private globalRankingMap: Map<number, IGetRankingResponseDTOUser[]> = new Map(
		[]
	);
	private globalCount = 0;
	private isFirstGlobalRankingLoad = true;

	// tag ranking map (tagId, page, users)
	private tagRankingMap: Map<
		number,
		Map<number, IGetRankingResponseDTOUser[]>
	> = new Map([]);
	private tagCountMap = new Map<number, number>([]);

	public displayedUsers$ = new Observable<IGetRankingResponseDTO>();

	constructor(
		private readonly _route: ActivatedRoute,
		private readonly _location: Location,
		private readonly _getRankingApiService: GetRankingApiService
	) {}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}

	ngOnInit(): void {
		this._subscription.add(
			this._route.queryParams.subscribe((params) => {
				const paramActivePage = params['type'];
				if (paramActivePage) {
					switch (paramActivePage) {
						case 'global':
							this.activePage = RankingType.Global;
							this.getRankingMap(1, true);
							break;
						case 'tag':
							this.activePage = RankingType.Tag;
							break;
						default:
							this.activePage = RankingType.Global;
							this.getRankingMap(1, true);
					}
				} else {
					this.getRankingMap(1, true);
				}
				const paramTagId = params['tagId'];
				if (paramTagId) {
					this.tagId = Number.parseInt(paramTagId);
					this.getRankingMap(1, true);
				}
			})
		);
	}

	public handleTabChanged(index: number): void {
		this.activePage = this.allTabs[index];
		if (this.activePage === RankingType.Global) {
			this.tagId = null;
			this.getRankingMap(1, this.isFirstGlobalRankingLoad);
		} else {
			this.displayedUsers$ = of();
		}
		this.setNewLoaction();
	}

	public getParamsAsString(): string {
		let params = new HttpParams().append('type', this.activePage);
		if (this.tagId) {
			params = params.append('tagId', this.tagId);
		}
		return params.toString();
	}

	public handleTagSelected(tagId: number | null): void {
		this.tagId = tagId;
		this.setNewLoaction();
		if (tagId !== null) this.getRankingMap(1, !this.tagCountMap.has(tagId));
		else this.displayedUsers$ = of();
	}

	public setNewLoaction() {
		this._location.replaceState('public/ranking', this.getParamsAsString());
	}

	public getRankingMap(page: number, addCount = false): void {
		const requestObject = new GetRankingRequestDTO(page, addCount, this.tagId);
		// check if has in local cache
		if (this.tagId) {
			if (
				this.tagRankingMap.has(this.tagId) &&
				this.tagRankingMap.get(this.tagId)?.has(page)
			) {
				this.displayedUsers$ = of({
					rankingPage: this.tagRankingMap.get(this.tagId)?.get(page) ?? [],
					pagesCount: this.tagCountMap.get(this.tagId) ?? 0,
				});
				return;
			}
		} else {
			if (this.globalRankingMap.has(page)) {
				this.displayedUsers$ = of({
					rankingPage: this.globalRankingMap.get(page) ?? [],
					pagesCount: this.globalCount,
				});
				return;
			}
		}

		this.displayedUsers$ = this._getRankingApiService
			.getRanking(requestObject)
			.pipe(
				map((response) => {
					if (!addCount) {
						if (this.tagId) {
							return {
								rankingPage: response.rankingPage,
								pagesCount: this.tagCountMap.get(this.tagId) ?? 0,
							} as IGetRankingResponseDTO;
						}
						return {
							rankingPage: response.rankingPage,
							pagesCount: this.globalCount,
						} as IGetRankingResponseDTO;
					}
					return response;
				})
			)
			.pipe(
				map((response) => {
					response.rankingPage.forEach((user) => {
						user.titles = user.titles.sort((a, b) => a.order - b.order);
					});
					return response;
				})
			)
			.pipe(
				tap((response) => {
					if (this.tagId) {
						if (!this.tagRankingMap.has(this.tagId)) {
							this.tagRankingMap.set(this.tagId, new Map([]));
						}
						this.tagRankingMap.get(this.tagId)?.set(page, response.rankingPage);
						this.tagCountMap.set(this.tagId, response.pagesCount);
					} else {
						this.isFirstGlobalRankingLoad = false;
						this.globalRankingMap.set(page, response.rankingPage);
						this.globalCount = response.pagesCount;
					}
				})
			);
	}
}
