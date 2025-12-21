package ratemysupps.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ratemysupps.entity.Brand;
import ratemysupps.entity.Supplement;
import ratemysupps.repository.IBrandRepository;
import ratemysupps.writemodel.WriteBrand;
import ratemysupps.writemodel.WriteSupplement;

import java.time.LocalDateTime;

@Component
public class WriteSupplementMapper {

    @Autowired
    private IBrandRepository brandRepository;

    public Supplement toEntity(WriteSupplement writeSupplement) {
        Supplement supplement = new Supplement();

        supplement.setSupplementName(writeSupplement. getProductName());
        supplement.setAverageRating(0.0);
        supplement.setTotalReviews(0);

        Brand brand = brandRepository.findById(writeSupplement. getBrandId())
                .orElseThrow(() -> new RuntimeException(
                "Brand not found with id: " + writeSupplement.getBrandId()
        ));
        supplement.setBrand(brand);

        supplement.setCreatedAt(LocalDateTime.now());

        supplement.setServingSizes(writeSupplement.getGetServingSizes());


        return supplement;
    }
}
