package ratemysupps.readmodel;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReadSupplement {

    public Long id;

    public String supplementName;

    private Integer totalReviews;
    private Double averageRating;

    public String imageUrl;
}
