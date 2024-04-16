package trivia.triviaApp.questionBlocks;

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
import trivia.triviaApp.user.CreateUserDTO;
import trivia.triviaApp.user.UpdateUserDTO;
import trivia.triviaApp.user.User;

@RestController
@RequestMapping("/questionBlocks")
public class QuestionBlockController {
	
	@Autowired
	private QuestionBlockService questionBlockService;
	
	@PostMapping
	public ResponseEntity<QuestionBlock> createQuestionBlock(@Valid @RequestBody CreateQuestionBlockDTO data) throws ServiceValidationException {
	QuestionBlock createdQuestionBlock = this.questionBlockService.createQuestionBlock(data);
	return new ResponseEntity<>(createdQuestionBlock, HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<QuestionBlock>> getAllQuestionBlocks() {
		List<QuestionBlock> allQuestionBlocks = this.questionBlockService.getAll();
		return new ResponseEntity<>(allQuestionBlocks, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<QuestionBlock> getQuestionBlockById(@PathVariable Long id) throws NotFoundException {
		Optional<QuestionBlock> maybeQuestionBlock = this.questionBlockService.findById(id);
		QuestionBlock foundQuestionBlock = maybeQuestionBlock.orElseThrow(() -> new NotFoundException(QuestionBlock.class, id));
		return new ResponseEntity<>(foundQuestionBlock, HttpStatus.OK);
	}
	
//	@PatchMapping("/{id}")
//	public ResponseEntity<QuestionBlock> updateQuestionBlockById(@Valid @RequestBody UpdateQuestionBlockDTO data, @PathVariable Long id) throws NotFoundException, ServiceValidationException {
//		Optional<QuestionBlock> maybeUpdatedQuestionBlock = this.questionBlockService.updateById(data, id);
//		QuestionBlock updatedQuestionBlock = maybeUpdatedQuestionBlock.orElseThrow(() -> new NotFoundException(QuestionBlock.class, id));
//		return new ResponseEntity<>(updatedQuestionBlock, HttpStatus.OK);
//	}
}
