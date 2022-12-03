export class GetTagsRequestDto {
	constructor(public keyword: string) {}
}
export interface IGetTagsResponseDto {
	tags: ITag[];
}
export interface ITag {
	id: number;
	name: string;
}
