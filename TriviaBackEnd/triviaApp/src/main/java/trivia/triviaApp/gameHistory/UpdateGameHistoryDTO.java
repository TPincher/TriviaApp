package trivia.triviaApp.gameHistory;

public class UpdateGameHistoryDTO {
	
	private long userId;
	
	private long score;

	public long getScore() {
		return score;
	}

	public void setScore(long score) {
		this.score = score;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}
	
}
