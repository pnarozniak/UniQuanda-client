export class UserClaims {
	id: number;
	roles: string[];
	nickname: string;
	avatar: string;

	constructor(id: number, roles: string[], nickname: string, avatar: string) {
		this.id = id;
		this.roles = roles;
		this.avatar = avatar;
		this.nickname = nickname;
	}
}
