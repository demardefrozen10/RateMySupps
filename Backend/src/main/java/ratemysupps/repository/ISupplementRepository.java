package ratemysupps.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ratemysupps.entity.Supplement;

import java.util.List;

public interface ISupplementRepository extends JpaRepository<Supplement, Long> {


    List<Supplement> findByBrandId(Long brandId);
}
