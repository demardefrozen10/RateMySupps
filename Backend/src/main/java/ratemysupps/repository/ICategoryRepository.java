package ratemysupps.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ratemysupps.entity.Category;

import java.util.Optional;


public interface ICategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByName(String name);

}
