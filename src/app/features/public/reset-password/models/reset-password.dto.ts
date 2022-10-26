export interface IResetPasswordDto {
	email: string;
	recoveryToken: string;
	newPassword: string;
}
