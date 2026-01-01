package ratemysupps.readmodel;

import lombok.Setter;
import lombok.Getter;

@Setter
@Getter
public class ReadBrand {
    public String brandName;

    public String country;

    public String imageUrl;

    public String websiteUrl;

    public double averageRating;

    public int totalReviews;

    public Long id;

}
