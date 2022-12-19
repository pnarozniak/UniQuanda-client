export interface IUpdateAnswerLikeValueRequestDTO {
	idAnswer: number;
	likeValue: number;
}

export interface IUpdateAnswerLikeValueResponseDTO {
	likeValue: number;
	likes: number;
}
