export class CheckNicknameAndEmailResponseDTO {
	public isEmailAvailable: boolean;
	public isNicknameAvailable: boolean;
	constructor(data: CheckNicknameAndEmailResponseDTO) {
		this.isEmailAvailable = data.isEmailAvailable;
		this.isNicknameAvailable = data.isNicknameAvailable;
	}
}
