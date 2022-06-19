import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { LoginRequestDTO, LoginResponseDTO } from './models/loginDTO';

@Injectable({
	providedIn: 'root',
})
export class LoginService {
	constructor(private readonly _apiService: ApiService) {}

	public login(
		username: string,
		password: string
	): Observable<LoginResponseDTO> {
		const body = new LoginRequestDTO(username, password);
		return this._apiService
			.post<LoginResponseDTO, LoginRequestDTO>('Auth/login', body)
			.pipe(map((data: LoginResponseDTO) => new LoginResponseDTO(data)));
	}
}
