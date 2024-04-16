package trivia.triviaApp.KillerQs;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import trivia.triviaApp.exceptions.ValidationErrors;
import trivia.triviaApp.questionBlocks.QuestionBlock;
import trivia.triviaApp.questionBlocks.QuestionBlockService;
import trivia.triviaApp.user.User;
import trivia.triviaApp.user.UserService;

@Service
@Transactional
public class KillerQService {
	
	@Autowired
	private KillerQRepository repo;
	
	@Autowired 
	private UserService userService;
	
	@Autowired 
	private QuestionBlockService questionBlockService;

	public KillerQ createKillerQ(CreateKillerQDTO data) {
		KillerQ newKillerQ = new KillerQ();
		ValidationErrors errors = new ValidationErrors();
		
		Long userId = data.getUserId();
		Long questionBlockId = data.getQuestionBlockId();
		
		
		Optional<User> maybeUser = this.userService.findById(userId);
		if(maybeUser.isEmpty() ) {
			errors.addError("user", String.format("User with id %s does not exist", userId));
		} else {
			newKillerQ.setUser(maybeUser.get());
		}
		
		Optional<QuestionBlock> maybeQuestionBlock = this.questionBlockService.findById(questionBlockId);
		if(maybeQuestionBlock.isEmpty() ) {
			errors.addError("questionBlock", String.format("QuestionBlock with id %s does not exist", questionBlockId));
		} else {
			newKillerQ.setQuestionBlock(maybeQuestionBlock.get());
		}
		
		
		newKillerQ.setCategory(data.getCategory());
		newKillerQ.setCorrected(data.getCorrected());

		
		return this.repo.save(newKillerQ);
	}
	
	public List<KillerQ> getAll() {
		return this.repo.findAll();
	}

	public Optional<KillerQ> findById(Long id) {
		return this.repo.findById(id);
	}

	public Optional<KillerQ> updateById(@Valid UpdateKillerQDTO data, Long id) {

		Optional<KillerQ> maybeKillerQ = this.findById(id);
		if(maybeKillerQ.isEmpty()) {
			return maybeKillerQ;
		}
		KillerQ foundKillerQ = maybeKillerQ.get();
		
		if(data.isCorrected() != foundKillerQ.getCorrected()) {
			foundKillerQ.setCorrected(data.isCorrected());
		}
		
		KillerQ updatedKillerQ = this.repo.save(foundKillerQ);
		return Optional.of(updatedKillerQ);
	}


}
