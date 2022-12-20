import { ITag } from 'src/app/shared/models/tag.model';

export interface IGetQuestionDetailsForUpdateResponseDTO {
	id: number;
	title: string | null;
	rawText: string | null;
	tags: ITag[];
}
