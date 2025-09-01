package com.curiousmuch.service;

import com.curiousmuch.dto.VoteRequest;
import com.curiousmuch.model.*;
import com.curiousmuch.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VoteService {
    
    @Autowired
    private VoteRepository voteRepository;
    
    @Autowired
    private AnswerRepository answerRepository;
    
    @Autowired
    private UserService userService;
    
    @Transactional
    public void voteOnAnswer(Long answerId, VoteRequest request, Long userId) {
        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));
        User user = userService.findById(userId);
        
        // Users can't vote on their own answers
        if (answer.getUser().getId().equals(userId)) {
            throw new RuntimeException("Cannot vote on your own answer");
        }
        
        // Check if user already voted
        voteRepository.findByUserIdAndAnswerId(userId, answerId)
                .ifPresentOrElse(
                    existingVote -> {
                        // Update existing vote
                        if (existingVote.getVoteType() != request.getVoteType()) {
                            // Remove old vote count
                            updateAnswerVoteCount(answer, existingVote.getVoteType(), false);
                            // Add new vote count
                            updateAnswerVoteCount(answer, request.getVoteType(), true);
                            // Update vote type
                            existingVote.setVoteType(request.getVoteType());
                            voteRepository.save(existingVote);
                        }
                    },
                    () -> {
                        // Create new vote
                        Vote vote = new Vote(request.getVoteType(), user, answer);
                        voteRepository.save(vote);
                        updateAnswerVoteCount(answer, request.getVoteType(), true);
                    }
                );
    }
    
    @Transactional
    public void removeVote(Long answerId, Long userId) {
        Vote vote = voteRepository.findByUserIdAndAnswerId(userId, answerId)
                .orElseThrow(() -> new RuntimeException("Vote not found"));
        
        Answer answer = vote.getAnswer();
        updateAnswerVoteCount(answer, vote.getVoteType(), false);
        voteRepository.delete(vote);
    }
    
    private void updateAnswerVoteCount(Answer answer, VoteType voteType, boolean increment) {
        if (voteType == VoteType.UPVOTE) {
            answer.setUpvotes(increment ? answer.getUpvotes() + 1 : answer.getUpvotes() - 1);
        } else {
            answer.setDownvotes(increment ? answer.getDownvotes() + 1 : answer.getDownvotes() - 1);
        }
        answerRepository.save(answer);
    }
}