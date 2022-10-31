import { OrderDirection } from 'src/app/shared/enums/order-direction.enum';

export interface IGetTagsResponseDto {
	tags: ITag[];
	parentTag?: ITag;
	totalCount?: number;
}
export interface ITag {
	id: number;
	name: string;
	imageUrl?: string;
	description?: string;
	parentTagId?: number;
}
export default class GetTagsRequestDto {
	/**
	 * @param addCount If true, totalCount will be added to response
	 * @param page Page number
	 * @param pageSize Amount of items per page
	 * @param OrderDirection Order direction
	 * @param addParentTagData If true and ParentTagId provided, parentTag data will be added to response
	 * @param parentTagId Parent tag id
	 * @param keyword value to search for
	 */
	constructor(
		public addCount: boolean,
		public page: number,
		public pageSize: number,
		public orderDirection: OrderDirection,
		public addParentTagData?: boolean,
		public parentTagId?: number,
		public keyword?: string
	) {
		if (parentTagId === undefined && addParentTagData !== undefined) {
			addParentTagData = undefined;
		}
	}
}
