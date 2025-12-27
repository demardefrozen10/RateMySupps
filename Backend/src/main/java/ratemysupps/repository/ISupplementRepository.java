package ratemysupps.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ratemysupps.entity.Supplement;
import java.util.List;

public interface ISupplementRepository extends JpaRepository<Supplement, Long> {

    List<Supplement> findByBrandId(Long brandId);

    @Query("SELECT s FROM supplement s LEFT JOIN FETCH s.reviews WHERE s.brand.id = :brandId")
    List<Supplement> findAllWithReviewsByBrandId(@Param("brandId") Long brandId);

    List<Supplement> findByAverageRatingGreaterThanEqual(Double minRating, Sort sort);
    List<Supplement> findByOrderByAverageRatingDesc(); 
    List<Supplement> findByOrderByTotalReviewsDesc();
    List<Supplement> findByAverageRating(Double rating);
    List<Supplement> findBySupplementNameContainingIgnoreCase(String name);

   @Query("""
    SELECT s FROM supplement s 
    JOIN s.category c
    WHERE s.brand.id = :brandId 
      AND (CAST(:search AS string) IS NULL OR LOWER(s.supplementName) LIKE LOWER(CAST(:search AS string))) 
      AND (CAST(:filter AS string) IS NULL OR LOWER(c.name) = LOWER(CAST(:filter AS string)))
""")
List<Supplement> findByBrandWithFilters(
    @Param("brandId") Long brandId, 
    @Param("search") String search, 
    @Param("filter") String filter, 
    Sort sort
);
}