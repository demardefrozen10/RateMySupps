package ratemysupps.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ratemysupps.entity.Brand;

import java.util.List;

@Repository
public interface IBrandRepository extends JpaRepository<Brand, Long> {

    List<Brand> findBybrandNameContainingIgnoreCase(String name);

}
