package ratemysupps.commandservice;

import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import ratemysupps.entity.Brand;
import ratemysupps.entity.IReviewable;
import ratemysupps.entity.Review;
import ratemysupps.entity.Supplement;
import ratemysupps.icommandservice.IReviewCommandService;
import ratemysupps.mapper.ReadReviewMapper;
import ratemysupps.mapper.WriteReviewMapper;
import ratemysupps.readmodel.ReadReview;
import ratemysupps.repository.IReviewRepository;
import ratemysupps.repository.ISupplementRepository;
import ratemysupps.writemodel.WriteReview;

@Service
public class ReviewCommandService implements IReviewCommandService {

    private final WriteReviewMapper writeMapper;
    private final ReadReviewMapper readMapper;
    private final IReviewRepository repo;
    private final ISupplementRepository supplementRepo;

    public ReviewCommandService(WriteReviewMapper writeMapper, IReviewRepository repo, ReadReviewMapper readMapper, ISupplementRepository supplementRepo) {
        this.writeMapper = writeMapper;
        this.repo = repo;
        this.readMapper = readMapper;
        this.supplementRepo = supplementRepo;
    }

    @Override
    public ReadReview submitReview(WriteReview review) {

        Review entityReview = writeMapper.toEntity(review);

        Supplement supplement = supplementRepo.findById(review.getSupplementId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Supplement not found"
                ));

        entityReview.setSupplement(supplement);

        return readMapper.fromEntity(repo.save(entityReview));
    }

    @Override
    @Transactional
    public ReadReview approveReview(Long reviewId) {
        Review review = repo.findById(reviewId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Review not found"
                ));

        Supplement supplement = review.getSupplement();
        updateReview(review, supplement);
        updateReview(review, supplement.getBrand());

        review.setVerified(true);

        return readMapper.fromEntity(review);  // No save needed
    }

    private void updateReview(Review review, IReviewable reviewable) {
        double oldAvg = reviewable.getAverageRating();
        int oldCount = reviewable.getTotalReviews();
        double newRating = review.getRating();

        double newAvg = (oldAvg * oldCount + newRating) / (oldCount + 1);

        reviewable.setAverageRating(newAvg);
        reviewable.setTotalReviews(oldCount + 1);
    }
}
