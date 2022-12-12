import { IContent } from 'src/app/shared/models/content.model';

export default class UpdateQuestionRequestDTO implements IContent {
	constructor(
		public idQuestion: number,
		public rawText: string,
		public tagIds: number[],
		public title: string,
		public confirmation: boolean
	) {}
}
