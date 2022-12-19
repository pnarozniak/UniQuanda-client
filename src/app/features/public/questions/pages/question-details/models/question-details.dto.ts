import { IAuthorContent } from './author-content';

export interface IQuestionDetailsResponseDTO {
	questionDetails: IQuestionDetailsEntity;
}

export interface IQuestionDetailsEntity {
	id: number;
	header: string;
	content: string;
	isQuestionFollowed: boolean;
	publishDate: Date;
	amountOfAnswers: number;
	author: IAuthorContent;
	views: number;
	hasCorrectAnswer: boolean;
	tags: IQuestionDetailsTag[];
}

export interface IQuestionDetailsTag {
	id: number;
	name: string;
	order: number;
}
