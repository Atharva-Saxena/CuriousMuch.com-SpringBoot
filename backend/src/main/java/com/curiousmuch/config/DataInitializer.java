package com.curiousmuch.config;

import com.curiousmuch.model.*;
import com.curiousmuch.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private QuestionRepository questionRepository;
    
    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User user = new User("testuser", "test@example.com", "password123");
            userRepository.save(user);
            
            Question question = new Question("Sample Question", "This is a sample question content", Category.OTHER, user);
            questionRepository.save(question);
        }
    }
}