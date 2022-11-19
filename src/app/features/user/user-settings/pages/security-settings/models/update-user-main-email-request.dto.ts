import { AppUserSecurityActionResult } from '../enums/app-user-security-action-result.enum';

export interface IUpdateUserMainEmailRequestDTO {
	newMainEmail: string;
	idExtraEmail: number | null;
	password: string;
}

export interface IUpdateUserMainEmailResponseDTO {
	actionResult: AppUserSecurityActionResult;
}
