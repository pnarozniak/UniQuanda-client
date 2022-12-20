import { IAutomaticTestAnswer } from './automatic-test-answer.model';

export interface IAutomaticTestQuestion {
	id: number;
	createdAt: string;
	html: string;
	header: string;
	answer: IAutomaticTestAnswer;
}
