package ratemysupps.commandservice;

import org.springframework.stereotype.Service;
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
    private final ISupplementRepository suppRepo;

    public ReviewCommandService(
            WriteReviewMapper writeMapper,
            IReviewRepository repo,
            ISupplementRepository suppRepo,
            ReadReviewMapper readMapper
    ) {
        this.writeMapper = writeMapper;
        this.repo = repo;
        this.suppRepo = suppRepo;
        this.readMapper = readMapper;
    }

    @Override
    public ReadReview submitReview(WriteReview review) {

        Review entityReview = writeMapper.toEntity(review);

        Supplement supplement = suppRepo.findById(review.getSupplementId())
                .orElseThrow(() -> new RuntimeException("Supplement not found"));

        entityReview.setSupplement(supplement);

        double oldAvg = supplement.getAverageRating();
        int oldCount = supplement.getTotalReviews();
        double newRating = entityReview.getRating();

        double newAvg = (oldAvg * oldCount + newRating) / (oldCount + 1);

        supplement.setAverageRating(newAvg);
        supplement.setTotalReviews(oldCount + 1);

        return readMapper.fromEntity(repo.save(entityReview));
    }
}
