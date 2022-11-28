export interface IConfirmOAuthRegisterRequestDTO {
	confirmationCode: string;
	nickname: string;
	firstName: string | null;
	lastName: string | null;
	birthdate: Date | null;
	phoneNumber: string | null;
	city: string | null;
}

export interface IConfirmOAuthRegisterResponseDTO {
	accessToken: string;
}
