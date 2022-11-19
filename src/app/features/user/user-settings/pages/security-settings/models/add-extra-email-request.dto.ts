import { AppUserSecurityActionResult } from '../enums/app-user-security-action-result.enum';

export interface IAddExtraEmailRequestDTO {
	newExtraEmail: string;
	password: string;
}

export interface IAddExtraEmailResponseDTO {
	actionResult: AppUserSecurityActionResult;
}
