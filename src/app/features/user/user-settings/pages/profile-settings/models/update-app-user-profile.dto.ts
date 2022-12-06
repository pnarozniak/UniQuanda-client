import { AppUserProfileUpdateResult } from '../enums/app-user-profile-update-result.enum';

export interface IUpdateAppUserProfileResponseDTO {
	updateStatus: AppUserProfileUpdateResult;
	avatarUrl: string;
}
