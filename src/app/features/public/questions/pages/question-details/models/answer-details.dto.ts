import { IAuthorContent } from './author-content';

export interface IAnswerDetailsResponseDTO {
	answers: IAnswerDetails[];
}

export interface IAnswerDetails {
	id: number;
	parentId: number | null;
	isModified: boolean;
	publishDate: Date;
	isCorrect: boolean;
	content: string;
	likes: number;
	userLikeValue: number;
	author: IAuthorContent;
	commentsAmount: number;
	comments: IAnswerDetails[];
}
