export default class HeaderStatistics {
	public points: number;
	public questions: number;
	public answers: number;
	constructor(data: HeaderStatistics) {
		this.points = data.points;
		this.questions = data.questions;
		this.answers = data.answers;
	}
}
