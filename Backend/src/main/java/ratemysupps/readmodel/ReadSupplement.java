package ratemysupps.readmodel;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReadSupplement {

    public Long id;

    public String supplementName;

    private Integer totalReviews;
    private Double averageRating;

    public String imageUrl;

    public List<String> variants;
}
