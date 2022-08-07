export class RegisterRequestDTO {
	constructor(
		public nickname: string,
		public password: string,
		public email: string,
		public firstName: string | null,
		public lastName: string | null,
		public birthdate: Date | null,
		public phoneNumber: string | null,
		public city: string | null
	) {}
}
