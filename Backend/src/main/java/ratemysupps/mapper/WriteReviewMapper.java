package ratemysupps.mapper;

import org.springframework.stereotype.Component;
import ratemysupps.entity.Review;
import ratemysupps.writemodel.WriteReview;

import java.time.LocalDateTime;
import java.util.ArrayList;


@Component
public class WriteReviewMapper {

    public Review toEntity(WriteReview writeReview) {
        Review review = new Review();

        review.setUsername(writeReview.getUsername());
        review.setRating(writeReview.getRating());
        review.setComment(writeReview.getComment());
        review.setImageUrls(writeReview.getImageUrls() != null ? writeReview.getImageUrls() : new ArrayList<>());
        review.setPurchaseImageUrl(writeReview. getPurchaseImageUrl());
        review.setVerified(false);
        review.setCreatedAt(LocalDateTime.now());
        review.setVariant(writeReview.getVariant());

        return review;
    }
}
