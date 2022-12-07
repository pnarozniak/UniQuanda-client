import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class OAuthService {
	redirectToGoogleLogin() {
		const scope = [
			'https://www.googleapis.com/auth/userinfo.email',
			'https://www.googleapis.com/auth/userinfo.profile',
		].join(' ');

		const params = {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			response_type: 'code',
			// eslint-disable-next-line @typescript-eslint/naming-convention
			client_id: environment.oauth.google.clientId,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			redirect_uri: environment.oauth.google.redirectUrl,
			prompt: 'select_account',
			// eslint-disable-next-line @typescript-eslint/naming-convention
			access_type: 'offline',
			scope,
		};

		const urlParams = new URLSearchParams(params).toString();
		window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${urlParams}`;
	}
}
