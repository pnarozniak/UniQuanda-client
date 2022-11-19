import { AppUserSecurityActionResult } from '../enums/app-user-security-action-result.enum';

export interface IDeleteExtraEmailRequestDTO {
	idExtraEmail: number;
	password: string;
}

export interface IDeleteExtraEmailResponseDTO {
	actionResult: AppUserSecurityActionResult;
}
