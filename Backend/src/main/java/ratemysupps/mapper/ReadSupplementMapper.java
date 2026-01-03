package ratemysupps.mapper;

import org.springframework.stereotype.Component;
import ratemysupps.entity.Category;
import ratemysupps.entity.Supplement;
import ratemysupps.entity.Tag;
import ratemysupps.readmodel.ReadSupplement;
import ratemysupps.readmodel.ReadTag;
import ratemysupps.repository.IBrandRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

        if (supplement.getTags() != null) {
            readSupplement.setTags(supplement.getTags().stream()
                    .map(this::mapTag)
                    .collect(Collectors.toList()));
        } else {
            readSupplement.setTags(new ArrayList<>());
        }

        return readSupplement;
    }

    private ReadTag mapTag(Tag tag) {
        ReadTag readTag = new ReadTag();
        readTag.setId(tag.getId());
        readTag.setName(tag.getName());
        return readTag;
    }




    public List<String> fromEntityVariant(List<Category> variants) {
        List<String> list = new ArrayList<>();
        for (Category category : variants) {
            list.add(category.getName());
        }
        return list;
    }

    
}