import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserClaims } from '../models/user-claims.model';
import { StorageService } from './storage.service';

@Injectable()
export class UserDataService {
	private readonly _user$ = new BehaviorSubject<UserClaims | null>(null);

	constructor(private readonly _storageService: StorageService) {
		this.setInitialUserData();
	}

	setUserData(user: UserClaims | null): void {
		this._user$.next(user);
	}

	getUserData$(): BehaviorSubject<UserClaims | null> {
		return this._user$;
	}

	getUserData(): UserClaims | null {
		return this._user$.getValue();
	}

	private setInitialUserData() {
		const claims = this._storageService.getUserClaims();
		if (!claims) return;
		this.setUserData(claims);
	}
}
