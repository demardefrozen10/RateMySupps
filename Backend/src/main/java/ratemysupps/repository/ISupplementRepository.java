package ratemysupps.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ratemysupps.entity.Supplement;
import ratemysupps.entity.Tag;

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

@Query("SELECT s FROM supplement s " +
       "JOIN s.category c " +
       "WHERE s.brand.id = :brandId " +
       "AND (:search IS NULL OR LOWER(s.supplementName) LIKE :search) " + 
       "AND (:filter IS NULL OR LOWER(c.name) = :filter)")
List<Supplement> findByBrandWithFilters(
    @Param("brandId") Long brandId, 
    @Param("search") String search, 
    @Param("filter") String filter, 
    Sort sort
);

@Query("SELECT v FROM supplement s JOIN s.variants v WHERE s.id = :id")
List<String> getVariantsBySupplementId(@Param("id") Long id);


List<Supplement> findTop6ByBrand_IdAndIdNotOrderByAverageRating_Desc(Long brandId, Long supplementId);
List<Supplement> findByTagsInAndIdNotInOrderByAverageRating_Desc(List<Tag> tags, List<Long> excludeIds);
}