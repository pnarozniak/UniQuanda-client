export class ConfirmRegistrationRequestDTO {
	constructor(public email: string, public confirmationCode: string) {}
}
