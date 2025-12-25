package ratemysupps.mapper;

import org.springframework.stereotype.Component;
import ratemysupps.entity.Review;
import ratemysupps.readmodel.ReadReview;

@Component
public class ReadReviewMapper {
    public ReadReview fromEntity(Review review) {
        ReadReview readReview = new ReadReview();

        readReview.setId(review.getId());
        readReview.setUsername(review.getUsername());
        readReview.setRating(review.getRating());
        readReview.setComment(review.getComment());
        readReview.setImageUrls(review.getImageUrls());
        readReview.setCreatedAt(review.getCreatedAt());

        return readReview;
    }
}
