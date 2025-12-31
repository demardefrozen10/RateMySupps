package ratemysupps.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ratemysupps.entity.Tag;

public interface ITagRepository extends JpaRepository<Tag, Long> {
    
    @Query("SELECT t FROM Tag t")
    List<Tag> findAllTags();
    List<Tag> findByNameContainingIgnoreCase(String keyword);
    List<Tag> findBySupplements_Id(Long supplementId);


}
