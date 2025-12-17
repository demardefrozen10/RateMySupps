package ratemysupps.writemapper;

import org.springframework.stereotype.Component;
import ratemysupps.entity.Brand;
import ratemysupps.writemodel.WriteBrand;

import java.time.LocalDateTime;

@Component
public class WriteBrandMapper {

    public Brand toEntity(WriteBrand writeBrand) {
        Brand brand = new Brand();

        brand.setBrandName(writeBrand.getBrandName());
        brand.setDescription(writeBrand.getDescription());
        brand.setWebsiteUrl(writeBrand.getWebsiteUrl());
        brand.setImageUrl(writeBrand.getImageUrl());
        brand.setCountry(writeBrand.getCountry());

        brand.setCreatedAt(LocalDateTime.now());
        brand.setVerified(false);
        brand.setAverageRating(0.0);
        brand.setTotalReviews(0);

        return brand;
    }
}
