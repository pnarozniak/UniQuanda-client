export interface ILoginRequestDTO {
	email: string;
	password: string;
}

export interface ILoginResponseDTO {
	status: LoginResponseStatus;
	accessToken: string | null;
	refreshToken: string | null;
	nickname: string | null;
	avatar: string | null;
}

export enum LoginResponseStatus {
	Success = 0,
	EmailNotConfirmed = 2,
}
