export default class University {
	public id: number;
	public name: string;
	public logo: string;
	public order: number;
	constructor(data: University) {
		this.id = data.id;
		this.name = data.name;
		this.logo = data.logo;
		this.order = data.order;
	}
}
