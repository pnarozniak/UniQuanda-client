export interface IGetUserEmailsReponseDTO {
	mainEmail: IUserEmailValue;
	emailToConfirm: IUserEmailToConfirmValue | null;
	extraEmails: IUserEmailValue[];
}

export interface IUserEmailValue {
	idEmail: number;
	value: string;
}

export interface IUserEmailToConfirmValue {
	idEmail: number;
	value: string;
	isMainEmail: boolean;
}
