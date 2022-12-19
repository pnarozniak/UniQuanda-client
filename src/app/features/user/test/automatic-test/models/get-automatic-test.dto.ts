export interface IGetAutomaticTestResponseDTO {
	questions: IAutomaticTestQuestion[];
}

export interface IAutomaticTestQuestion {
	id: number;
	createdAt: string;
	html: string;
	header: string;
	answer: IAutomaticTestAnswer;
}

export interface IAutomaticTestAnswer {
	id: number;
	html: string;
	createdAt: string;
}
