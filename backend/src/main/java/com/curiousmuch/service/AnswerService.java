package com.curiousmuch.service;

import com.curiousmuch.dto.AnswerRequest;
import com.curiousmuch.model.*;
import com.curiousmuch.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class AnswerService {
    
    @Autowired
    private AnswerRepository answerRepository;
    
    @Autowired
    private QuestionRepository questionRepository;
    
    @Autowired
    private UserService userService;
    
    public List<Answer> getAnswersByQuestionId(Long questionId) {
        return answerRepository.findByQuestionIdOrderByBestAndScore(questionId);
    }
    
    public Answer createAnswer(Long questionId, AnswerRequest request, Long userId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        User user = userService.findById(userId);
        
        Answer answer = new Answer();
        answer.setContent(request.getContent());
        answer.setQuestion(question);
        answer.setUser(user);
        
        return answerRepository.save(answer);
    }
    
    public Answer updateAnswer(Long id, AnswerRequest request, Long userId) {
        Answer answer = answerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Answer not found"));
        
        if (!answer.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to update this answer");
        }
        
        answer.setContent(request.getContent());
        return answerRepository.save(answer);
    }
    
    @Transactional
    public void deleteAnswer(Long id, Long userId) {
        Answer answer = answerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Answer not found"));
        
        if (!answer.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to delete this answer");
        }
        
        answerRepository.delete(answer);
    }
    
    @Transactional
    public Answer markAsBestAnswer(Long answerId, Long userId) {
        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));
        
        // Only question owner can mark best answer
        if (!answer.getQuestion().getUser().getId().equals(userId)) {
            throw new RuntimeException("Only question owner can mark best answer");
        }
        
        // Remove existing best answer
        answerRepository.findByQuestionIdAndIsBestAnswerTrue(answer.getQuestion().getId())
                .ifPresent(existingBest -> {
                    existingBest.setIsBestAnswer(false);
                    answerRepository.save(existingBest);
                });
        
        // Mark new best answer
        answer.setIsBestAnswer(true);
        return answerRepository.save(answer);
    }
}