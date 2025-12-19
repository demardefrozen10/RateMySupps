package ratemysupps.readmodel;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReadSupplement {

    public Long id;

    public String supplementName;

    public double averageRating;

    public int totalReviews;

    public String imageUrl;
}
