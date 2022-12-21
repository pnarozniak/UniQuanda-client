export interface IGetAllCommentsResponseDTO {
	comments: ICommentDetails[];
}

interface ICommentDetails {
	id: number;
	publishDate: Date;
	content: string;
}
