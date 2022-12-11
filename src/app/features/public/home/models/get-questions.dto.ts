import { OrderDirection } from 'src/app/shared/enums/order-direction.enum';
import { QuestionSortingBy } from '../enums/question-sorting-by.enum';

export interface IGetQuestionsRequestDto {
	page: number;
	pageSize: number;
	sortBy: QuestionSortingBy;
	orderBy: OrderDirection;
	addCount: boolean;
	tags: number[];
	searchText: string;
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
