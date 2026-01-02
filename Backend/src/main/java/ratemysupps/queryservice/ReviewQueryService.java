package ratemysupps.queryservice;

import org.springframework.stereotype.Service;
import ratemysupps.entity.Review;
import ratemysupps.entity.Supplement;
import ratemysupps.iqueryservice.IReviewQueryService;
import ratemysupps.mapper.ReadReviewMapper;
import ratemysupps.readmodel.ReadReview;
import ratemysupps.repository.IReviewRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class ReviewQueryService implements IReviewQueryService {

    private ReadReviewMapper mapper;
    private IReviewRepository reviewRepo;
    public ReviewQueryService(IReviewRepository reviewRepo, ReadReviewMapper mapper) {
        this.reviewRepo = reviewRepo;
        this.mapper = mapper;
    }


    @Override
    public List<ReadReview> getReviewBySupplementId(Long supplementId, String sortBy, String sortOrder, String variant, int limit) {
    List<ReadReview> reviews;
    
    if (sortBy == null) {
        reviews = getUnsortedReviews(supplementId);
    } else if ("rating".equals(sortBy)) {
        reviews = "asc".equals(sortOrder)
                ? getReviewsBySupplementIdByMinRating(supplementId)
                : getReviewsBySupplementIdByMaxRating(supplementId);
    } else if ("date".equals(sortBy)) {
        reviews = getReviewsBySupplementIdByMaxDate(supplementId);
    } else {
        reviews = getUnsortedReviews(supplementId);
    }

    if (variant != null && !variant.isEmpty()) {
        reviews = reviews.stream()
                .filter(review -> variant.equals(review.getVariant()))
                .collect(Collectors.toList());
    }

        return reviews.stream()
            .limit(limit)
            .collect(Collectors.toList());
    }


    private List<ReadReview> getUnsortedReviews(Long supplementId) {
        return reviewRepo.findBySupplementId(supplementId).stream()
                .filter(Review::isVerified)
                .map(mapper::fromEntity)
                .collect(Collectors.toList());
    }


    private List<ReadReview> getReviewsBySupplementIdByMinRating(Long supplementId) {
        List<ReadReview> readReviews = new ArrayList<>();
        List<Review> reviews = reviewRepo.findBySupplementIdOrderByRatingAsc(supplementId).stream().filter(Review::isVerified).toList();

        for (Review review : reviews) {
            readReviews.add(mapper.fromEntity(review));
        }

        return readReviews;
    }

    private List<ReadReview> getReviewsBySupplementIdByMaxRating(Long supplementId) {
        List<ReadReview> readReviews = new ArrayList<>();
        List<Review> reviews = reviewRepo.findBySupplementIdOrderByRatingDesc(supplementId).stream().filter(Review::isVerified).toList();

        for (Review review : reviews) {
            readReviews.add(mapper.fromEntity(review));
        }

        return readReviews;
    }

    private List<ReadReview> getReviewsBySupplementIdByMaxDate(Long supplementId) {
        List<ReadReview> readReviews = new ArrayList<>();
        List<Review> reviews = reviewRepo.findBySupplementIdOrderByCreatedAtDesc(supplementId).stream().filter(Review::isVerified).toList();

        for (Review review : reviews) {
            readReviews.add(mapper.fromEntity(review));
        }

        return readReviews;
    }

    



}