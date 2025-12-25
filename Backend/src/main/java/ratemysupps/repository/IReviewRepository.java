package ratemysupps.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ratemysupps.entity.Review;

import java.util.List;

public interface IReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findBySupplementId(Long supplementId);
    List<Review> findBySupplementIdAndIsVerified(Long supplementId, boolean isVerified);
    List<Review> findBySupplementIdOrderByRatingDesc(Long supplementId);

    List<Review> findBySupplementIdOrderByRatingAsc(Long supplementId);
    List<Review> findBySupplementIdOrderByCreatedAtDesc(Long supplementId);



}
