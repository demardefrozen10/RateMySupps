package ratemysupps.mapper;

import org.springframework.stereotype.Component;
import ratemysupps.entity.Brand;
import ratemysupps.entity.Supplement;
import ratemysupps.readmodel.ReadBrand;
import ratemysupps.readmodel.ReadSupplement;
import ratemysupps.readmodel.ReadSupplementComplex;

@Component
public class ReadSupplementMapper {

    public ReadSupplement fromEntity(Supplement supplement) {
        ReadSupplement readSupplement = new ReadSupplement();

        readSupplement.setSupplementName(supplement.getSupplementName());

        readSupplement.setTotalReviews(supplement.getTotalReviews());

        readSupplement.setAverageRating(supplement.getAverageRating());

        readSupplement.setImageUrl(supplement.getImageUrl());

        readSupplement.setId(supplement.getId());

        return readSupplement;
    }


    public ReadSupplementComplex fromEntityComplex(Supplement supplement) {
        ReadSupplementComplex readSupplementComplex = new ReadSupplementComplex();

        readSupplementComplex.setId(supplement.getId());
        readSupplementComplex.setSupplementName(supplement.getSupplementName());
        readSupplementComplex.setAverageRating(supplement.getAverageRating());
        readSupplementComplex.setImageUrl(supplement.getImageUrl());
        readSupplementComplex.setServingSizes(supplement.getServingSizes());
        readSupplementComplex.setTotalReviews(supplement.getTotalReviews());

        return readSupplementComplex;
    }
}
