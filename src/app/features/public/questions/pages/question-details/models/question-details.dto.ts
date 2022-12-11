import { IAcademicTitle } from 'src/app/shared/models/academic-title.model';

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
	answers: IAnswerDetails[];
}

export interface IAuthorContent {
	id: number;
	nickname: string;
	avatarUrl: string | null;
	academicTitles: IAcademicTitle[];
}

export interface IQuestionDetailsTag {
	id: number;
	name: string;
	order: number;
}

export interface IAnswerDetails {
	id: number;
	isModified: boolean;
	publishDate: Date;
	isCorrect: boolean;
	content: string;
	likes: number;
	userLikeValue: number;
	author: IAuthorContent;
}
