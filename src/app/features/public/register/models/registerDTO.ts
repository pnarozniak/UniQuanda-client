export class RegisterRequestDTO {
	public nickname: string;
	public password: string;
	public email: string;
	public firstName: string | null;
	public lastName: string | null;
	public birthdate: Date | null;
	public phoneNumber: string | null;
	public city: string | null;
	constructor(
		nickname: string,
		password: string,
		email: string,
		firstName: string | null,
		lastName: string | null,
		birthdate: Date | null,
		phoneNumber: string | null,
		city: string | null
	) {
		this.nickname = nickname;
		this.password = password;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.birthdate = birthdate;
		this.phoneNumber = phoneNumber;
		this.city = city;
	}
}
