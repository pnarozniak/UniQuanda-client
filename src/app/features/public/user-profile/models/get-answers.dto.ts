export class GetAnswersRequestDto {
	constructor(
		public readonly userId: number,
		public readonly page: number,
		public readonly pageSize: number,
		public readonly addCount: boolean
	) {}
}
export interface IGetAnswersResponseDto {
	answers: IGetAnswersResponseDtoAnswer[];
	totalCount: number | null;
}
export interface IGetAnswersResponseDtoAnswer {
	id: number;
	parentId: number | null;
	questionId: number;
	header: string;
	html: string;
	likes: number;
	isCorrect: boolean;
	createdAt: string;
	tagNames: string[];
}
