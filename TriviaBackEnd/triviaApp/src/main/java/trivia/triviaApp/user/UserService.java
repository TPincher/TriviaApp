package trivia.triviaApp.user;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
@Transactional
public class UserService {

	@Autowired
	private UserRepository repo;

	public User createUser(CreateUserDTO data) {
		User newUser = new User(); 
			newUser.setName(data.getName());
			newUser.setPersonalBest(0);
		
		return this.repo.save(newUser);
	}

	public List<User> getAll() {
		return this.repo.findAll();
	}
	
	public Optional<User> findById(long id) {
		return this.repo.findById(id);
	}

	public Optional<User> updateById(@Valid UpdateUserDTO data, Long id) {
		Optional<User> maybeUser = this.findById(id);
			if(maybeUser.isEmpty()) {
				return maybeUser;
			}
	
			User foundUser = maybeUser.get();
			if(data.getName() != null) {
				foundUser.setName(data.getName());
			}
			if(data.getPersonalBest() > foundUser.getPersonalBest()) {
				foundUser.setPersonalBest(data.getPersonalBest());
			}

			User updatedUser = this.repo.save(foundUser);
			return Optional.of(updatedUser);
	}
	
	public boolean deleteUserById(Long id) {
		Optional<User> maybeUser = this.repo.findById(id);
		if(maybeUser.isEmpty()) {
			return false;
		}
		this.repo.delete(maybeUser.get());
		return true;
	}

	
	
}
