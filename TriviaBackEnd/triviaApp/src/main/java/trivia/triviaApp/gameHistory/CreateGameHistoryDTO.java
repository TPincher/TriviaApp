package trivia.triviaApp.gameHistory;

import java.util.Date;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;

public class CreateGameHistoryDTO {

	@Min(value = 1, message = "User ID must be greater than or equal to 1")
	private long userId;
	
	@NotBlank
	@Pattern(regexp = "^(easy|medium|hard|all)$")
	private String difficulty;
	
	private Date gameDate;

	@NotNull
	@PositiveOrZero
	private Long score;

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(String difficulty) {
		this.difficulty = difficulty;
	}

	public Date getGameDate() {
		return gameDate;
	}

	public void setGameDate(Date gameDate) {
		this.gameDate = gameDate;
	}


	public Long getScore() {
		return score;
	}

	public void setScore(Long score) {
		this.score = score;
	}
}
