package ratemysupps.mapper;

import org.springframework.stereotype.Component;
import ratemysupps.entity.Supplement;
import ratemysupps.readmodel.ReadSupplement;

@Component
public class ReadSupplementMapper {

    public ReadSupplement toEntity(Supplement supplement) {
        ReadSupplement readSupplement = new ReadSupplement();

        readSupplement.setSupplementName(supplement.getSupplementName());

        readSupplement.setTotalReviews(supplement.getTotalReviews());

        readSupplement.setAverageRating(supplement.getAverageRating());

        readSupplement.setImageUrl(supplement.getImageUrl());

        return readSupplement;
    }
}
