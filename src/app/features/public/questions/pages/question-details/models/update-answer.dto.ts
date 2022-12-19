import { IContent } from 'src/app/shared/models/content.model';

export interface IUpdateAnswerRequestDTO extends IContent {
	idAnswer: number;
}
