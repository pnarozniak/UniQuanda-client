export class ResendConfirmationCodeRequestDTO {
	public email: string;
	constructor(email: string) {
		this.email = email;
	}
}
