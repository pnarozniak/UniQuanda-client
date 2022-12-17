import { IContent } from 'src/app/shared/models/content.model';

export interface IAddAnswerRequestDTO extends IContent {
	idQuestion: number;
	parentAnswerId: number | null;
}
