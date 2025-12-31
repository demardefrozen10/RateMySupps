package ratemysupps.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.util.Streamable;

import ratemysupps.entity.Supplement;

import java.util.List;

public interface ISupplementRepository extends JpaRepository<Supplement, Long> {


    List<Supplement> findByBrandId(Long brandId);
    List<Supplement> findByAverageRatingGreaterThanEqual(Double minRating, Sort sort);
    List<Supplement> findByOrderByAverageRatingDesc(); 
    List<Supplement> findByOrderByTotalReviewsDesc();
    List<Supplement> findByAverageRating(Double rating);
    List<Supplement> findBySupplementNameContainingIgnoreCase(String name);

}
