export class RegisterRequestDTO {
	constructor(
		public nickname: string,
		public password: string,
		public email: string,
		public firstName: string | null,
		public lastName: string | null,
		public birthdate: Date | null,
		public contact: string | null,
		public city: string | null
	) {}
}
