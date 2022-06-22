export class ConfirmRegistrationRequestDTO {
	public email: string;
	public confirmationCode: string;
	constructor(email: string, confiramtionCode: string) {
		this.email = email;
		this.confirmationCode = confiramtionCode;
	}
}
