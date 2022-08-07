import { Role } from '../enums/role.enum';

export class UserClaims {
	id: number;
	roles: Role[];
	nickname: string;
	avatar: string;

	constructor(id: number, roles: Role[], nickname: string, avatar: string) {
		this.id = id;
		this.roles = roles;
		this.avatar = avatar;
		this.nickname = nickname;
	}
}
