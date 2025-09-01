package com.curiousmuch.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AnswerController {
    
    private static Map<Long, List<Map<String, Object>>> questionAnswers = new HashMap<>();
    private static Long nextAnswerId = 1L;
    
    @GetMapping("/questions/{questionId}/answers")
    public ResponseEntity<?> getAnswersByQuestionId(@PathVariable Long questionId) {
        List<Map<String, Object>> answers = questionAnswers.getOrDefault(questionId, new ArrayList<>());
        return ResponseEntity.ok(answers);
    }
    
    @PostMapping("/questions/{questionId}/answers")
    public ResponseEntity<?> createAnswer(@PathVariable Long questionId, @RequestBody Map<String, Object> request) {
        try {
            Map<String, Object> answer = new HashMap<>();
            answer.put("id", nextAnswerId++);
            answer.put("content", request.get("content"));
            answer.put("upvotes", 0);
            answer.put("downvotes", 0);
            answer.put("isBestAnswer", false);
            answer.put("createdAt", new Date());
            
            Map<String, Object> user = new HashMap<>();
            user.put("id", 1);
            user.put("username", "testuser");
            answer.put("user", user);
            
            questionAnswers.computeIfAbsent(questionId, k -> new ArrayList<>()).add(answer);
            return ResponseEntity.ok(answer);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to create answer");
        }
    }
    
    @PostMapping("/answers/{id}/vote")
    public ResponseEntity<?> voteOnAnswer(@PathVariable Long id, @RequestBody Map<String, Object> voteData) {
        try {
            String voteType = (String) voteData.get("voteType");
            
            for (List<Map<String, Object>> answers : questionAnswers.values()) {
                for (Map<String, Object> answer : answers) {
                    if (id.equals(answer.get("id"))) {
                        if ("UPVOTE".equals(voteType)) {
                            answer.put("upvotes", (Integer) answer.get("upvotes") + 1);
                        } else if ("DOWNVOTE".equals(voteType)) {
                            answer.put("downvotes", (Integer) answer.get("downvotes") + 1);
                        }
                        return ResponseEntity.ok(answer);
                    }
                }
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to vote");
        }
    }
    
    @PostMapping("/answers/{id}/mark-best")
    public ResponseEntity<?> markAsBestAnswer(@PathVariable Long id) {
        try {
            for (List<Map<String, Object>> answers : questionAnswers.values()) {
                for (Map<String, Object> answer : answers) {
                    if (id.equals(answer.get("id"))) {
                        answer.put("isBestAnswer", true);
                        return ResponseEntity.ok(answer);
                    }
                }
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to mark as best answer");
        }
    }
}