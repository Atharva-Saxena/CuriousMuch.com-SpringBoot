package com.curiousmuch.repository;

import com.curiousmuch.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    @Query("SELECT a FROM Answer a WHERE a.question.id = :questionId ORDER BY a.isBestAnswer DESC, (a.upvotes - a.downvotes) DESC, a.createdAt ASC")
    List<Answer> findByQuestionIdOrderByBestAndScore(@Param("questionId") Long questionId);
    
    Optional<Answer> findByQuestionIdAndIsBestAnswerTrue(Long questionId);
    
    long countByQuestionId(Long questionId);
}