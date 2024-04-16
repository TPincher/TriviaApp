package trivia.triviaApp.questionBlocks;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
import trivia.triviaApp.KillerQs.KillerQ;
import trivia.triviaApp.gameHistory.GameHistory;

@Entity
@Table(name = "questionBlocks")
public class QuestionBlock {

	public QuestionBlock() {
		
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "gameHistory_id") 
	@JsonIgnoreProperties("questionBlockId")
	private GameHistory gameHistory;
	
	@OneToOne(cascade = CascadeType.ALL, mappedBy = "questionBlock")
	@JoinColumn(name = "killerQ_id")
	private KillerQ killerQ;
	
	@Column
	private String questionText;
	
	@Column
	private String answers;
	
	@Column
	private String submittedAnswer;
	
	@Column
	private String correctAnswer;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Long getGameHistory() {
		return gameHistory.getId();
	}

	public void setGameHistory(GameHistory gameHistory) {
		this.gameHistory = gameHistory;
	}

	public Long getKillerQ() {
		return killerQ != null ? killerQ.getId() : null;
	}

	public void setKillerQ(KillerQ killerQ) {
		this.killerQ = killerQ;
	}


	
}
