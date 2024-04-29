package trivia.triviaApp.gameHistory;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import trivia.triviaApp.exceptions.ServiceValidationException;
import trivia.triviaApp.exceptions.ValidationErrors;
import trivia.triviaApp.user.User;
import trivia.triviaApp.user.UserService;

@Service
@Transactional
public class GameHistoryService {

	@Autowired
	private GameHistoryRepository repo;
	
	@Autowired 
	private UserService userService;
	
	public GameHistory createGameHistory(@Valid CreateGameHistoryDTO data) throws ServiceValidationException {
		GameHistory newGameHistory = new GameHistory();
		
		Long userId = data.getUserId();
		ValidationErrors errors = new ValidationErrors();
		
		Optional<User> maybeUser = this.userService.findById(userId);
		if(maybeUser.isEmpty() ) {
			errors.addError("user", String.format("User with id %s does not exist", userId));
		} else {
			newGameHistory.setUserId(maybeUser.get());
		}
		
//			newGameHistory.setId(data.getUserId());
			newGameHistory.setDifficulty(data.getDifficulty());
			newGameHistory.setGameDate(data.getGameDate());
			newGameHistory.setScore(data.getScore());
			
			if(errors.hasErrors()) {
				return null;
			}
			
		return this.repo.save(newGameHistory);
	}

	public List<GameHistory> getAllHistory() {
		return this.repo.findAll();
	}

	public Optional<GameHistory> findById(@Valid Long id) {
		return this.repo.findById(id);
	}

	public Optional<GameHistory> updateById(@Valid UpdateGameHistoryDTO data, Long id) {
		Optional<GameHistory> maybeGameHistory = this.findById(id);
			if(maybeGameHistory.isEmpty()) {
				return maybeGameHistory;
			}
			
			GameHistory foundGameHistory = maybeGameHistory.get();
			ValidationErrors errors = new ValidationErrors();
			Long userId = data.getUserId();
			
			if (data.getScore() > -1) {
				foundGameHistory.setScore(data.getScore());
			}
			
			Optional<User> maybeUser = this.userService.findById(userId);
			if(maybeUser.isEmpty() ) {
				errors.addError("user", String.format("User with id %s does not exist", userId));
			} else {
				foundGameHistory.setUserId(maybeUser.get());
			}
			
			GameHistory updatedGameHistory = this.repo.save(foundGameHistory);
			return Optional.of(updatedGameHistory);
	}
	
	
}
