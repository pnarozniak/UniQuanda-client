import { ITestAnswer } from './test-answer.model';

export interface ITestQuestion {
	id: number;
	createdAt: string;
	html: string;
	header: string;
	answer: ITestAnswer;
}
