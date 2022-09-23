export default class AcademicTitle {
	public name: string;
	public academicTitleType: AcademicTitleType;
	public order: number;
	constructor(data: AcademicTitle) {
		this.name = data.name;
		this.academicTitleType = data.academicTitleType;
		this.order = data.order;
	}
}
export enum AcademicTitleType {
	Bachelor = 0,
	Engineer = 1,
	Academic = 2,
}
