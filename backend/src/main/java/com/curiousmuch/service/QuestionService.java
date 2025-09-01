package com.curiousmuch.service;

import com.curiousmuch.dto.QuestionRequest;
import com.curiousmuch.model.*;
import com.curiousmuch.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuestionService {
    
    @Autowired
    private QuestionRepository questionRepository;
    
    @Autowired
    private UserService userService;
    
    public Page<Question> getAllQuestions(Pageable pageable) {
        return questionRepository.findAllByOrderByCreatedAtDesc(pageable);
    }
    
    public Question getQuestionById(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        
        // Increment view count
        question.setViewCount(question.getViewCount() + 1);
        return questionRepository.save(question);
    }
    
    public Question createQuestion(QuestionRequest request, Long userId) {
        User user = userService.findById(userId);
        
        Question question = new Question();
        question.setTitle(request.getTitle());
        question.setContent(request.getContent());
        question.setImageUrl(request.getImageUrl());
        question.setCategory(request.getCategory());
        question.setUser(user);
        
        return questionRepository.save(question);
    }
    
    public Question updateQuestion(Long id, QuestionRequest request, Long userId) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        
        if (!question.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to update this question");
        }
        
        question.setTitle(request.getTitle());
        question.setContent(request.getContent());
        question.setImageUrl(request.getImageUrl());
        question.setCategory(request.getCategory());
        
        return questionRepository.save(question);
    }
    
    @Transactional
    public void deleteQuestion(Long id, Long userId) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        
        if (!question.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to delete this question");
        }
        
        questionRepository.delete(question);
    }
    
    public Page<Question> searchQuestions(String query, Pageable pageable) {
        return questionRepository.searchByTitleOrContent(query, pageable);
    }
    
    public Page<Question> getQuestionsByCategory(Category category, Pageable pageable) {
        return questionRepository.findByCategory(category, pageable);
    }
}