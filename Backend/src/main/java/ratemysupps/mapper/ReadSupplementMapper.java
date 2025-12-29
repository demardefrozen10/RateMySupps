package ratemysupps.mapper;

import org.springframework.stereotype.Component;
import ratemysupps.entity.Category;
import ratemysupps.entity.Supplement;
import ratemysupps.readmodel.ReadSupplement;
import ratemysupps.readmodel.ReadSupplementComplex;

import java.util.ArrayList;
import java.util.List;

@Component
public class ReadSupplementMapper {

    public ReadSupplement fromEntity(Supplement supplement) {
        ReadSupplement readSupplement = new ReadSupplement();

        readSupplement.setSupplementName(supplement.getSupplementName());

        readSupplement.setTotalReviews(supplement.getTotalReviews());

        readSupplement.setAverageRating(supplement.getAverageRating());

        readSupplement.setImageUrl(
        supplement.getImageUrl().isEmpty() ? null : supplement.getImageUrl().get(0)
    );


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
        readSupplementComplex.setCategory(supplement.getCategory().getName());

        return readSupplementComplex;
    }

    public List<String> fromEntityVariant(List<Category> variants) {
        List<String> list = new ArrayList<>();
        for (Category category : variants) {
            list.add(category.getName());
        }
        return list;
    }
}
