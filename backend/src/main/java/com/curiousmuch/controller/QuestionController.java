package com.curiousmuch.controller;

import com.curiousmuch.dto.QuestionRequest;
import com.curiousmuch.model.*;
import com.curiousmuch.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.*;
import java.util.Date;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "*")
public class QuestionController {
    
    private static List<Map<String, Object>> questions = new ArrayList<>();
    private static Long nextId = 1L;
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getQuestionById(@PathVariable Long id) {
        try {
            Map<String, Object> question = questions.stream()
                .filter(q -> q.get("id").equals(id))
                .findFirst()
                .orElse(null);
            
            if (question == null) {
                return ResponseEntity.status(404).body("Question not found");
            }
            
            return ResponseEntity.ok(question);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Question not found");
        }
    }
    

    
    // @Autowired
    // private QuestionService questionService;
    
    @GetMapping
    public ResponseEntity<?> getAllQuestions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Map<String, Object> mockResponse = new HashMap<>();
            mockResponse.put("content", questions);
            mockResponse.put("totalElements", questions.size());
            mockResponse.put("totalPages", questions.isEmpty() ? 0 : 1);
            mockResponse.put("size", size);
            mockResponse.put("number", page);
            return ResponseEntity.ok(mockResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getQuestionById(@PathVariable Long id) {
        try {
            Map<String, Object> question = questions.stream()
                .filter(q -> q.get("id").equals(id))
                .findFirst()
                .orElse(null);
            
            if (question == null) {
                return ResponseEntity.status(404).body("Question not found");
            }
            
            return ResponseEntity.ok(question);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Question not found");
        }
    }
    
    @PostMapping
    public ResponseEntity<?> createQuestion(@RequestBody Map<String, Object> request) {
        try {
            Map<String, Object> mockQuestion = new HashMap<>();
            mockQuestion.put("id", nextId++);
            mockQuestion.put("title", request.get("title"));
            mockQuestion.put("content", request.get("content"));
            mockQuestion.put("category", request.get("category"));
            mockQuestion.put("viewCount", 0);
            mockQuestion.put("createdAt", new Date());
            
            Map<String, Object> mockUser = new HashMap<>();
            mockUser.put("id", 1);
            mockUser.put("username", "testuser");
            mockQuestion.put("user", mockUser);
            
            questions.add(mockQuestion);
            return ResponseEntity.ok(mockQuestion);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to create question: " + e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateQuestion(
            @PathVariable Long id,
            @Valid @RequestBody QuestionRequest request) {
        return ResponseEntity.ok("Update not implemented");
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
        return ResponseEntity.ok("Delete not implemented");
    }
    
    @GetMapping("/search")
    public ResponseEntity<?> searchQuestions(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        List<Map<String, Object>> searchResults = new ArrayList<>();
        String searchTerm = q.toLowerCase();
        
        for (Map<String, Object> question : questions) {
            String title = ((String) question.get("title")).toLowerCase();
            String content = ((String) question.get("content")).toLowerCase();
            
            if (title.contains(searchTerm) || content.contains(searchTerm)) {
                searchResults.add(question);
            }
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("content", searchResults);
        response.put("totalElements", searchResults.size());
        response.put("totalPages", searchResults.isEmpty() ? 0 : 1);
        response.put("size", size);
        response.put("number", page);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<?> getQuestionsByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        List<Map<String, Object>> filteredQuestions = new ArrayList<>();
        for (Map<String, Object> q : questions) {
            String questionCategory = (String) q.get("category");
            if (questionCategory != null && category.equals(questionCategory)) {
                filteredQuestions.add(q);
            }
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("content", filteredQuestions);
        response.put("totalElements", filteredQuestions.size());
        response.put("totalPages", filteredQuestions.isEmpty() ? 0 : 1);
        response.put("size", size);
        response.put("number", page);
        return ResponseEntity.ok(response);
    }
}