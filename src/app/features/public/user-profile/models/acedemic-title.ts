export default class AcademicTitle {
	public name: string;
	public academicTitleType: AcademicTitleType;
	public order: number;
	constructor(data: AcademicTitle) {
		this.name = data.name;
		this.academicTitleType = data.academicTitleType;
		this.order = data.order;
	}

	public static getAcademicTitleTypeColor(type: AcademicTitleType) {
		switch (type) {
			case AcademicTitleType.Engineer:
				return '#1AA39D';
			case AcademicTitleType.Bachelor:
				return '#262B90';
			case AcademicTitleType.Academic:
				return '#FE4D10';
			default:
				return '#000000';
		}
	}
}
enum AcademicTitleType {
	Bachelor = 0,
	Engineer = 1,
	Academic = 2,
}
