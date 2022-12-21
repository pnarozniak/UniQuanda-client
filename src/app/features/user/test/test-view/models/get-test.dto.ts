import { ITag } from 'src/app/shared/models/tag.model';
import { ITestQuestion } from './test-question.model';

export interface IGetTestResponseDTO {
	createdAt: string;
	isCreator: boolean;
	isFinished: boolean;
	questions: ITestQuestion[];
	tags: ITag[];
}
