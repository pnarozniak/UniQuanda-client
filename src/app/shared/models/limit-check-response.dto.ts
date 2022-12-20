import { DurationEnum } from '../enums/duration.enum';

export interface ILimitCheckResponseDTO {
	usedTimes: number | null;
	maxTimes: number | null;
	shortestRefreshPeriod: DurationEnum | null;
}
