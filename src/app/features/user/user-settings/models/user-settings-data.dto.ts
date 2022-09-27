export class UserSettingsDataResponseDTO {
	constructor(
		public firstName: string | null,
		public lastName: string | null,
		public birthdate: Date | null,
		public phoneNumber: string | null,
		public city: string | null,
		public semanticScholarProfile: string | null,
		public aboutText: string | null,
		public avatar: string | null,
		public banner: string | null
	) {}
}
