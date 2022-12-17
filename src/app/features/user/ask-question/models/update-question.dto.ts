import { IContent } from 'src/app/shared/models/content.model';

export interface IUpdateQuestionRequestDTO extends IContent {
	idQuestion: number;
	tagIds: number[];
	title: string;
	confirmation: boolean;
}
