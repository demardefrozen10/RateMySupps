package ratemysupps.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ratemysupps.entity.Brand;
import ratemysupps.entity.Category;
import ratemysupps.entity.Supplement;
import ratemysupps.repository.IBrandRepository;
import ratemysupps.writemodel.WriteSupplement;

import java.time.LocalDateTime;

@Component
public class WriteSupplementMapper {

    @Autowired
    private IBrandRepository brandRepository;

    public Supplement toEntity(WriteSupplement writeSupplement, Category category, Brand brand) {
        Supplement supplement = new Supplement();

        supplement.setSupplementName(writeSupplement. getProductName());
        supplement.setAverageRating(0.0);
        supplement.setTotalReviews(0);

        supplement.setBrand(brand);

        supplement.setCreatedAt(LocalDateTime.now());

        supplement.setServingSizes(writeSupplement.getServingSizes());

        supplement.setImageUrl(writeSupplement.getImageUrl());
        supplement.setWebsiteUrl(writeSupplement.getWebsiteUrl());

        supplement.setBrand(brand);
        supplement.setCategory(category);
        supplement.setCreatedAt(LocalDateTime.now());
        supplement.setAverageRating(0.0);
        supplement.setTotalReviews(0);

        return supplement;
    }
}