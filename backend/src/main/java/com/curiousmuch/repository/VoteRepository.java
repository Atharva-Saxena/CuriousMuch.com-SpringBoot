package com.curiousmuch.repository;

import com.curiousmuch.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findByUserIdAndAnswerId(Long userId, Long answerId);
    boolean existsByUserIdAndAnswerId(Long userId, Long answerId);
    void deleteByUserIdAndAnswerId(Long userId, Long answerId);
}