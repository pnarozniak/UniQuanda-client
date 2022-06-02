export class UserClaims {
	id: number;
	roles: string[];

	constructor(id: number, roles: string[]) {
		this.id = id;
		this.roles = roles;
	}
}
