package trivia.triviaApp.KillerQs;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class CreateKillerQDTO {

	@NotBlank
	private String category;
	
	private Boolean corrected;
	
	@Min(value = 0, message = "User ID must be greater than or equal to 0")
	private long userId;
	
	private long QuestionBlockId;


	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Boolean getCorrected() {
		return corrected;
	}

	public void setCorrected(Boolean corrected) {
		this.corrected = corrected;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public long getQuestionBlockId() {
		return QuestionBlockId;
	}

	public void setQuestionBlockId(long questionBlockId) {
		this.QuestionBlockId = questionBlockId;
	}
	
	
	
}
