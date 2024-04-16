package trivia.triviaApp.questionBlocks;

import jakarta.validation.constraints.Min;


public class CreateQuestionBlockDTO {

	@Min(value = 1, message = "GameHistory ID must be greater than or equal to 1")
	private long gameId;
	
	private String questionText;
	
	private String answers;
	
	private String submittedAnswer;
	
	private String correctAnswer;

	public long getGameId() {
		return gameId;
	}

	public void setGameId(long gameId) {
		this.gameId = gameId;
	}

	public String getQuestionText() {
		return questionText;
	}

	public void setQuestionText(String questionText) {
		this.questionText = questionText;
	}

	public String getAnswers() {
		return answers;
	}

	public void setAnswers(String answers) {
		this.answers = answers;
	}

	public String getSubmittedAnswer() {
		return submittedAnswer;
	}

	public void setSubmittedAnswer(String submittedAnswer) {
		this.submittedAnswer = submittedAnswer;
	}

	public String getCorrectAnswer() {
		return correctAnswer;
	}

	public void setCorrectAnswer(String correctAnswer) {
		this.correctAnswer = correctAnswer;
	}
	
	
}
