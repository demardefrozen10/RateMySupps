package ratemysupps.entity;

public interface IReviewable {
    Double getAverageRating();
    void setAverageRating(Double rating);
    Integer getTotalReviews();
    void setTotalReviews(Integer reviews);
}