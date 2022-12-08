import { IUserInRanking } from './user-in-ranking.model';

export interface IGetTop5UsersResponseDTO {
	top5Users: IUserInRanking[];
}
