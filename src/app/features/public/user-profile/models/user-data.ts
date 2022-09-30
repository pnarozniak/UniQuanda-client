export default class UserData {
	public id: number;
	public nickname: string;
	public firstName?: string;
	public lastName?: string;
	public avatar?: string;
	public banner?: string;
	constructor(data: UserData) {
		this.id = data.id;
		this.nickname = data.nickname;
		this.avatar = data.avatar;
		this.banner = data.banner;
		this.firstName = data.firstName;
		this.lastName = data.lastName;
	}
}
