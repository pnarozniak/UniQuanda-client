export class GetTitleRequestDTO {
	constructor(
		public readonly page: number,
		public readonly pageSize: number,
		public readonly addCount: boolean
	) {}
}
export interface ITitleRequestResponseDTO {
	requests: ITitleRequest[];
	totalCount: number | null;
}
export interface ITitleRequest {
	id: number;
	titleName: string;
	titleId: number;
	userId: number;
	userName: string;
	createAt: Date;
	scanUrl: string;
	additionalInfo: string;
}
