import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
	ISemanticScholarPaperDTO,
	ISemanticScholarPapersOfUserDTO,
} from '../models/semantic-scholar-paper.dto';

@Injectable({
	providedIn: 'root',
})
export class SemanticScholarService {
	constructor(private http: HttpClient) {}

	getPapersOfAuthor(authorId: string): Observable<ISemanticScholarPaperDTO[]> {
		return this.http
			.get<ISemanticScholarPapersOfUserDTO>(
				`https://api.semanticscholar.org/graph/v1/author/${authorId}/papers`
			)
			.pipe(
				map((response: ISemanticScholarPapersOfUserDTO) => {
					return response.data;
				})
			);
	}
}
