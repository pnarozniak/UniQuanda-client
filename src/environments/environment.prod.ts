import { common } from './environment.common';

export const environment = {
	...common,
	productionMode: true,
	backend: 'https://uniquanda.pl:2002/api',
	oauth: {
		...common.oauth,
		google: {
			...common.oauth.google,
			redirectUrl: 'https://uniquanda.pl:2002/api/Auth/login-by-google',
		},
	},
};
