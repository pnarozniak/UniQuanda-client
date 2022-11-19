export interface IUpdateUserMainEmailRequestDTO {
	newMainEmail: string;
	idExtraEmail: number | null;
	password: string;
}
