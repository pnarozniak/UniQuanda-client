import { OrderDirection } from 'src/app/shared/enums/order-direction.enum';
import { QuestionSortingBy } from '../enums/question-sorting-by.enum';

export class GetQuestionsRequestDto {
	constructor(
		public readonly page: number,
		public readonly pageSize: number,
		public readonly sortBy: QuestionSortingBy,
		public readonly orderBy: OrderDirection,
		public readonly addCount: boolean,
		public readonly tags: number[]
	) {}
}
export interface IGetQuestionsResponseDto {
	questions: IGetQuestionsResponseDtoQuestion[];
	totalCount: number | null;
}
export interface IGetQuestionsResponseDtoQuestion {
	id: number;
	header: string;
	html: string;
	views: number;
	answersCount: number;
	creationDate: Date;
	isPopular: boolean;
	hasCorrectAnswer: boolean;
	tagNames: string[];
	user: IGetQuestionsResponseDtoQuestionUser;
}
export interface IGetQuestionsResponseDtoQuestionUser {
	id: number;
	name: string;
	profilePictureURL: string | null;
}
