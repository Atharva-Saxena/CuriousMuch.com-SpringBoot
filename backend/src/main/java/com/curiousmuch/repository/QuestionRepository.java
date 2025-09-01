package com.curiousmuch.repository;

import com.curiousmuch.model.Question;
import com.curiousmuch.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    Page<Question> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<Question> findByCategory(Category category, Pageable pageable);
    Page<Question> findByUserId(Long userId, Pageable pageable);
    
    @Query("SELECT q FROM Question q WHERE q.title LIKE %:query% OR q.content LIKE %:query% ORDER BY q.createdAt DESC")
    Page<Question> searchByTitleOrContent(@Param("query") String query, Pageable pageable);
}