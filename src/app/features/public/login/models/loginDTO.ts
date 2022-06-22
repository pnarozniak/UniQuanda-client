export class LoginRequestDTO {
	public email: string;
	public password: string;
	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
	}
}

export class LoginResponseDTO {
	public status: LoginResponseStatus;
	public accessToken: string | null;
	public refreshToken: string | null;
	public nickname: string | null;
	public avatar: string | null;
	constructor(data: LoginResponseDTO) {
		this.status = data.status;
		this.accessToken = data.accessToken;
		this.refreshToken = data.refreshToken;
		this.nickname = data.nickname;
		this.avatar = data.avatar;
	}
}
export enum LoginResponseStatus {
	Success = 0,
	EmailNotConfirmed = 2,
}
