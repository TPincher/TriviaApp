package trivia.triviaApp.user;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@PostMapping
	public ResponseEntity<User> createUser(@Valid @RequestBody CreateUserDTO data) {
	User createdUser = this.userService.createUser(data);
	return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<User>> getAllUsers() {
		List<User> allUsers = this.userService.getAll();
		return new ResponseEntity<>(allUsers, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) throws NotFoundException {
		Optional<User> maybeUser = this.userService.findById(id);
		User foundUser = maybeUser.orElseThrow(() -> new NotFoundException(User.class, id));
		return new ResponseEntity<>(foundUser, HttpStatus.OK);
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<User> updateUserById(@Valid @RequestBody UpdateUserDTO data, @PathVariable Long id) throws NotFoundException, ServiceValidationException {
		Optional<User> maybeUpdatedUser = this.userService.updateById(data, id);
		User updatedUser = maybeUpdatedUser.orElseThrow(() -> new NotFoundException(User.class, id));
		return new ResponseEntity<>(updatedUser, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<User> deleteUserById(@PathVariable Long id) throws NotFoundException {
		boolean deleted = this.userService.deleteUserById(id);
		if(!deleted) {
			throw new NotFoundException(User.class, id);
		}
		return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
	}
}
