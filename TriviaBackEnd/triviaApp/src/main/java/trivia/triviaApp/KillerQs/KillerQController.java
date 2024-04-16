package trivia.triviaApp.KillerQs;

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
@RequestMapping("/killerQs")
public class KillerQController {

	@Autowired
	private KillerQService killerQService;
	
	
	@PostMapping
	public ResponseEntity<KillerQ> createKillerQ(@Valid @RequestBody CreateKillerQDTO data) {
		KillerQ createdKillerQ = this.killerQService.createKillerQ(data);
		return new ResponseEntity<>(createdKillerQ, HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<KillerQ>> getAllKillerQs() {
		List<KillerQ> allKillerQs = this.killerQService.getAll();
		return new ResponseEntity<>(allKillerQs, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<KillerQ> getKillerQsById(@PathVariable Long id) throws NotFoundException {
		Optional<KillerQ> maybeKillerQ = this.killerQService.findById(id);
		KillerQ foundKillerQ = maybeKillerQ.orElseThrow(() -> new NotFoundException(KillerQ.class, id));
		return new ResponseEntity<>(foundKillerQ, HttpStatus.OK);
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<KillerQ> updateKillerQById(@Valid @RequestBody UpdateKillerQDTO data, @PathVariable Long id) throws NotFoundException, ServiceValidationException {
		Optional<KillerQ> maybeUpdatedKillerQ = this.killerQService.updateById(data, id);
		KillerQ updatedKillerQ = maybeUpdatedKillerQ.orElseThrow(() -> new NotFoundException(KillerQ.class, id));
		return new ResponseEntity<>(updatedKillerQ, HttpStatus.OK);
	}
}
