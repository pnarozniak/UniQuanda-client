import { ITag } from 'src/app/shared/models/tag.model';

export interface IGetUserTestsResponseDTO {
	tests: IUserTestResponseDTO[];
}

export interface IUserTestResponseDTO {
	id: number;
	createdAt: string;
	isFinished: string;
	tags: ITag[];
}
