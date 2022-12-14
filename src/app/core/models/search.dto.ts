export interface ISearchResponseDTO {
	users: { id: number; nickname: string }[];
	questions: { id: number; header: string }[];
	universities: { id: number; name: string }[];
}
