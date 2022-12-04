import { IContent } from 'src/app/shared/models/content.model';

export default class AddQuestionDTO implements IContent {
	constructor(
		public rawText: string,
		public tagIds: number[],
		public title: string,
		public confirmation: boolean
	) {}
}
