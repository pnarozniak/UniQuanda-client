export interface IGetUserEmailsReponseDTO {
	mainEmail: IUserEmailValue;
	extraEmails: IUserEmailValue[];
}

export interface IUserEmailValue {
	idEmail: number;
	value: string;
}
