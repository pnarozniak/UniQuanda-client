import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class HeaderStateService {
	searchText = '';
	searchTextSubmit$ = new BehaviorSubject<string>('');
	searchForResults$ = new BehaviorSubject<null>(null);
}
