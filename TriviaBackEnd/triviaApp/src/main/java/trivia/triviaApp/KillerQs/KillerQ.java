package trivia.triviaApp.KillerQs;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import trivia.triviaApp.questionBlocks.QuestionBlock;
import trivia.triviaApp.user.User;

@Entity
@Table(name = "killerQs")
public class KillerQ {

	public KillerQ() {
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String category;
	
	@Column
	private Boolean corrected;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id")
	private User user;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "questionBlock_id")
	private QuestionBlock questionBlock;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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

	public Long getUser() {
	    return user != null ? user.getId() : null;
	}

	public void setUser(User userId) {
		this.user = userId;
	}

	public Long getQuestionBlock() {
	    return questionBlock != null ? questionBlock.getId() : null;
	}

	public void setQuestionBlock(QuestionBlock questionBlock) {
		this.questionBlock = questionBlock;
	}
	
	
	
}
