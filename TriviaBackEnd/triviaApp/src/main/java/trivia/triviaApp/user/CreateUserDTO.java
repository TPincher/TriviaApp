package trivia.triviaApp.user;

import jakarta.validation.constraints.NotBlank;

public class CreateUserDTO {
	
	@NotBlank
	private String name;
	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
