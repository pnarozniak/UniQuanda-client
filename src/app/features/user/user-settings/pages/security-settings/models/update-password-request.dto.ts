import { AppUserSecurityActionResult } from '../enums/app-user-security-action-result.enum';

export interface IUpdatePasswordRequestDTO {
	newPassword: string;
	oldPassword: string;
}

export interface IUpdatePasswordResponseDTO {
	actionResult: AppUserSecurityActionResult;
}
