export interface IUserData {
	id: number;
	nickname: string;
	firstName?: string;
	lastName?: string;
	avatar?: string;
	banner?: string;
	aboutText?: string;
	birthdate?: Date;
	city?: string;
	contact?: string;
	semanticScholarProfile?: string;
	hasPremium: boolean;
}
