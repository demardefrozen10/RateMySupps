package ratemysupps.queryservice;

import org.springframework.stereotype.Service;
import ratemysupps.entity.Review;
import ratemysupps.iqueryservice.IReviewQueryService;
import ratemysupps.mapper.ReadReviewMapper;
import ratemysupps.readmodel.ReadReview;
import ratemysupps.repository.IReviewRepository;

import java.util.ArrayList;
import java.util.List;


@Service
public class ReviewQueryService implements IReviewQueryService {

    private ReadReviewMapper mapper;

    IReviewRepository reviewRepo;
    public ReviewQueryService(IReviewRepository reviewRepo, ReadReviewMapper mapper) {
        this.reviewRepo = reviewRepo;
        this.mapper = mapper;
    }


    @Override
    public List<ReadReview> getReviewBySupplementId(Long supplementId) {
        List<Review> reviews = reviewRepo.findBySupplementId(supplementId);

        List<ReadReview> readReviews = new ArrayList<>();
        for (Review review : reviews) {
            readReviews.add(mapper.fromEntity(review));
        }

        return readReviews;
    }

    @Override
    public List<ReadReview> getVerifiedReviewsBySupplementId(Long supplementId) {
        List<Review> reviews = reviewRepo.findBySupplementIdAndIsVerified(supplementId, true);

        List<ReadReview> readReviews = new ArrayList<>();
        for (Review review : reviews) {
            readReviews.add(mapper.fromEntity(review));
        }

        return readReviews;
    }

    @Override
    public List<ReadReview> getReviewsBySupplementIdWithMinRating(Long supplementId, Double minRating) {
        List<Review> reviews = reviewRepo.findBySupplementIdAndRatingGreaterThanEqual(supplementId, minRating);

        List<ReadReview> readReviews = new ArrayList<>();
        for (Review review : reviews) {
            readReviews.add(mapper.fromEntity(review));
        }

        return readReviews;
    }

    
}