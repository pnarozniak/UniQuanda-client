import { AcademicTitleRequestStatusEnum } from 'src/app/shared/enums/academic-title-request-status.enum';

export class ChangeRequestStausRequestDTO {
	constructor(
		public readonly reuqestId: number,
		public readonly status: AcademicTitleRequestStatusEnum
	) {}
}
