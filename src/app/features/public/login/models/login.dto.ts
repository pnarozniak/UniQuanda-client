export class LoginRequestDTO {
	constructor(public email: string, public password: string) {}
}

export class LoginResponseDTO {
	public status: LoginResponseStatus;
	public accessToken: string | null;
	public refreshToken: string | null;
	public nickname: string | null;
	public avatar: string | null;
	public isPremium: boolean | null;
	constructor(data: LoginResponseDTO) {
		this.status = data.status;
		this.accessToken = data.accessToken;
		this.refreshToken = data.refreshToken;
		this.nickname = data.nickname;
		this.avatar = data.avatar;
		this.isPremium = true; // TODO: zmienić na data.isPremium gdy ustalony zostanie mechanizm premium
	}
}
export enum LoginResponseStatus {
	Success = 0,
	EmailNotConfirmed = 2,
}
