import { IContent } from 'src/app/shared/models/content.model';

export default class AddQuestionRequestDTO implements IContent {
	constructor(
		public rawText: string,
		public tagIds: number[],
		public title: string,
		public confirmation: boolean
	) {}
}
export interface IAddQuestionResponseDTO {
	questionid: number;
}
