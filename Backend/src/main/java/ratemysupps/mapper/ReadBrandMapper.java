package ratemysupps.mapper;

import org.springframework.stereotype.Component;
import ratemysupps.entity.Brand;
import ratemysupps.readmodel.ReadBrand;

@Component
public class ReadBrandMapper {

    public ReadBrand toEntity(Brand brand) {
        ReadBrand readBrand = new ReadBrand();

        readBrand.setBrandName(brand.getBrandName());
        readBrand.setCountry(brand.getCountry());
        readBrand.setImageUrl(brand.getImageUrl());
        readBrand.setWebsiteUrl(brand.getWebsiteUrl());
        readBrand.setAverageRating(brand.getAverageRating());
        readBrand.setTotalReviews(brand.getTotalReviews());
        readBrand.setId(brand.getId());

        return readBrand;
    }
}


