package trivia.triviaApp.user;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import trivia.triviaApp.KillerQs.KillerQ;
import trivia.triviaApp.gameHistory.GameHistory;

@Entity
@Table(name = "users")
public class User {

	public User() {
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column (unique = true)
	private String name;
	
	@OneToMany(mappedBy = "user")
	@JsonIgnoreProperties("userId")
	private List<GameHistory> gameHistory;
	
	@Column
	private long personalBest;

	@OneToMany(mappedBy = "user")
    @JsonIgnoreProperties("userId")
	private List<KillerQ> killerqs;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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

	public List<GameHistory> getGameHistory() {
		return gameHistory;
	}

	public void setGameHistory(List<GameHistory> gameHistory) {
		this.gameHistory = gameHistory;
	}

	public List<KillerQ> getKillerqs() {
		return killerqs;
	}

	public void setKillerqs(List<KillerQ> killerqs) {
		this.killerqs = killerqs;
	}
	
	
	
}
