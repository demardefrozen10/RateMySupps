package ratemysupps.mapper;

import org.springframework.stereotype.Component;
import ratemysupps.entity.Category;
import ratemysupps.entity.Supplement;
import ratemysupps.readmodel.ReadSupplement;
import ratemysupps.repository.IBrandRepository;

import java.util.ArrayList;
import java.util.List;

@Component
public class ReadSupplementMapper {

    public ReadSupplement fromEntity(Supplement supplement) {
        ReadSupplement readSupplement = new ReadSupplement();


        readSupplement.setId(supplement.getId());
        readSupplement.setSupplementName(supplement.getSupplementName());
        readSupplement.setAverageRating(supplement.getAverageRating());
        readSupplement.setImageUrl(supplement.getImageUrl());
        readSupplement.setServingSizes(supplement.getServingSizes());
        readSupplement.setTotalReviews(supplement.getTotalReviews());
        readSupplement.setCategory(supplement.getCategory().getName());
        readSupplement.setVariants(supplement.getVariants());

        readSupplement.setBrandName(supplement.getBrand().getBrandName());

        return readSupplement;
    }

    public List<String> fromEntityVariant(List<Category> variants) {
        List<String> list = new ArrayList<>();
        for (Category category : variants) {
            list.add(category.getName());
        }
        return list;
    }

    
}
