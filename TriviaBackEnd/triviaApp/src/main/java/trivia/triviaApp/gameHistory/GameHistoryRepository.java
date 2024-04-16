package trivia.triviaApp.gameHistory;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GameHistoryRepository extends JpaRepository<GameHistory, Long> {

}