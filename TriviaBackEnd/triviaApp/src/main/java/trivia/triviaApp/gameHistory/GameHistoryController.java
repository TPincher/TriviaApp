package trivia.triviaApp.gameHistory;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import trivia.triviaApp.exceptions.NotFoundException;
import trivia.triviaApp.exceptions.ServiceValidationException;


@RestController
@RequestMapping("/gameHistory")
public class GameHistoryController {
	
	@Autowired
	private GameHistoryService gameHistoryService;
	
	@PostMapping
		public ResponseEntity<GameHistory> createGameHistory(@Valid @RequestBody CreateGameHistoryDTO data) throws ServiceValidationException {
			GameHistory createdGameHistory = this.gameHistoryService.createGameHistory(data);
			return new ResponseEntity<>(createdGameHistory, HttpStatus.CREATED);
		}

	@GetMapping 
		public ResponseEntity<List<GameHistory>> getAllHistory() {
			List<GameHistory> allGameHistory = this.gameHistoryService.getAllHistory();
			return new ResponseEntity<>(allGameHistory, HttpStatus.OK);
		}

	@GetMapping("/{id}")
		public ResponseEntity<GameHistory> getSingleGameHistory(@Valid @PathVariable Long id) throws NotFoundException {
			Optional<GameHistory> maybeGameHistory = this.gameHistoryService.findById(id);
			GameHistory foundGameHistory = maybeGameHistory.orElseThrow(() -> new NotFoundException(GameHistory.class, id));
			return new ResponseEntity<>(foundGameHistory, HttpStatus.OK);
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<GameHistory> updateGameHistoryById(@Valid @RequestBody UpdateGameHistoryDTO data, @PathVariable Long id) throws NotFoundException, ServiceValidationException {
		Optional<GameHistory> maybeUpdatedGameHistory = this.gameHistoryService.updateById(data, id);
		GameHistory updatedGameHistory = maybeUpdatedGameHistory.orElseThrow(() -> new NotFoundException(GameHistory.class, id));
		return new ResponseEntity<>(updatedGameHistory, HttpStatus.OK);
	}
}
