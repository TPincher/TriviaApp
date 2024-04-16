package trivia.triviaApp.questionBlocks;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import trivia.triviaApp.exceptions.ServiceValidationException;
import trivia.triviaApp.exceptions.ValidationErrors;
import trivia.triviaApp.gameHistory.GameHistory;
import trivia.triviaApp.gameHistory.GameHistoryService;

@Service
@Transactional
public class QuestionBlockService {
	
	@Autowired
	private QuestionBlockRepository repo;
	
	@Autowired
	private GameHistoryService gameHistoryService;
	
	public QuestionBlock createQuestionBlock(CreateQuestionBlockDTO data) throws ServiceValidationException {
		QuestionBlock newQuestionBlock = new QuestionBlock();
		
		Long gameHistoryId = data.getGameId();
		ValidationErrors errors = new ValidationErrors();
		
		Optional<GameHistory> maybeGameHistory = this.gameHistoryService.findById(gameHistoryId);
		if(maybeGameHistory.isEmpty() ) {
			errors.addError("GameHistory", String.format("GameHistory with id %s does not exist", gameHistoryId));
		} else {
			newQuestionBlock.setGameHistory(maybeGameHistory.get());
		}
		
			newQuestionBlock.setQuestionText(data.getQuestionText());
			newQuestionBlock.setAnswers(data.getAnswers());
			newQuestionBlock.setCorrectAnswer(data.getCorrectAnswer());
			newQuestionBlock.setSubmittedAnswer(data.getSubmittedAnswer());
		
			if(errors.hasErrors()) {
				throw new ServiceValidationException(errors);
			}
			
		return this.repo.save(newQuestionBlock);
	}

	public List<QuestionBlock> getAll() {
		return this.repo.findAll();
	}

	public Optional<QuestionBlock> findById(Long id) {
		return this.repo.findById(id);
	}
}
