export class CheckNicknameAndEmailAvailabilityResponseDTO {
	public isEmailAvailable: boolean;
	public isNicknameAvailable: boolean;
	constructor(data: CheckNicknameAndEmailAvailabilityResponseDTO) {
		this.isEmailAvailable = data.isEmailAvailable;
		this.isNicknameAvailable = data.isNicknameAvailable;
	}
}
