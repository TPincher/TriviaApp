package trivia.triviaApp.user;

import jakarta.validation.constraints.Pattern;


public class UpdateUserDTO {

	@Pattern(regexp = "^(?=\\S).*$", message = "First name cannot be empty")
	private String name;
	
	private long personalBest;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getPersonalBest() {
		return personalBest;
	}

	public void setPersonalBest(long personalBest) {
		this.personalBest = personalBest;
	}
	
}
