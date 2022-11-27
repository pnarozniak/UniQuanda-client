import { common } from './environment.common';

export const environment = {
	...common,
	productionMode: true,
	backend: 'https://dev.uniquanda.pl:2002/api',
	oauth: {
		...common.oauth,
		google: {
			...common.oauth.google,
			redirectUrl: 'https://dev.uniquanda.pl:2002/api/Auth/login-by-google',
		},
	},
};
