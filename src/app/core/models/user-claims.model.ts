import { Role } from '../enums/role.enum';

export interface IUserClaims {
	id: number;
	roles: Role[];
	nickname: string;
	avatar?: string;
	accessToken: string;
	refreshToken: string;
}
