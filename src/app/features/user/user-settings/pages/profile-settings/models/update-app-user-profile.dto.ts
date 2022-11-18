import { AppUserProfileUpdateResultEnum } from '../enums/app-user-profile-update-result.enum';

export interface IUpdateAppUserProfileResponseDTO {
	updateStatus: AppUserProfileUpdateResultEnum;
	avatarUrl: string;
}
