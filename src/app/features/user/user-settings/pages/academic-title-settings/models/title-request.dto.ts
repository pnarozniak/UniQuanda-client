import { AcademicTitleRequestStatusEnum } from 'src/app/shared/enums/academic-title-request-status.enum';

export interface ITitleRequest {
	requestId: number;
	title: string;
	requestDate: Date;
	status: AcademicTitleRequestStatusEnum;
}
