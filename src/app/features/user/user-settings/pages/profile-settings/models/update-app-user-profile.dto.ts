import { AppUserProfileUpdateStatusEnum } from '../enums/app-user-profile-update-status.enum';

export interface IUpdateAppUserProfileResponseDTO {
	updateStatus: AppUserProfileUpdateStatusEnum;
	avatarUrl: string;
}
