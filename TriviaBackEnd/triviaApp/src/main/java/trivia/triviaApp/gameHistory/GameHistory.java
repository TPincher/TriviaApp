package trivia.triviaApp.gameHistory;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import trivia.triviaApp.questionBlocks.QuestionBlock;
import trivia.triviaApp.user.User;

@Entity
@Table(name = "gameHistory")
public class GameHistory {

	public GameHistory() {
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id")
	@JsonIgnoreProperties("game_History")
	private User user;
	
	@Column 
	private String difficulty;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = false, updatable = false)
	private Date gameDate;

	@Column
	private Long score;
	
	@OneToMany(mappedBy = "gameHistory")
	@JsonIgnoreProperties("gameHistory")
	private List<QuestionBlock> questionsBlockId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Long getUserId() {
		return user.getId();
	}

	public void setUserId(User user) {
		this.user = user;
	}

	public List<QuestionBlock> getQuestionsBlockId() {
		return questionsBlockId;
	}

	public void setQuestionsBlockId(List<QuestionBlock> questionsBlockId) {
		this.questionsBlockId = questionsBlockId;
	}

	@PrePersist
	public void onCreate() {
		Date timestamp = new Date();
		gameDate = timestamp;
	}

	
}
