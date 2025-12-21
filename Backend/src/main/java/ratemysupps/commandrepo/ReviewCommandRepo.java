package ratemysupps.commandrepo;

import org.springframework.stereotype.Component;
import ratemysupps.entity.Review;
import ratemysupps.entity.Supplement;
import ratemysupps.icommandrepo.IReviewCommandRepo;
import ratemysupps.mapper.WriteReviewMapper;
import ratemysupps.mapper.WriteSupplementMapper;
import ratemysupps.repository.IReviewRepository;
import ratemysupps.repository.ISupplementRepository;
import ratemysupps.writemodel.WriteReview;

@Component
public class ReviewCommandRepo implements IReviewCommandRepo {


    private final WriteReviewMapper mapper;
    private final IReviewRepository repo;
    private final ISupplementRepository suppRepo;


    public ReviewCommandRepo(WriteReviewMapper mapper, IReviewRepository repo, ISupplementRepository suppRepo) {
        this.mapper = mapper;
        this.repo = repo;
        this.suppRepo = suppRepo;
    }


    @Override
    public Review submitReview(WriteReview review) {

        Review entityReview = mapper.toEntity(review);

        Supplement supplement = suppRepo.findById(review.getSupplementId())
                .orElseThrow(() -> new RuntimeException("Supplement not found"));

        supplement.setTotalReviews(supplement.getTotalReviews() + 1);

        entityReview.setSupplement(supplement);

        double oldAvg = supplement.getAverageRating();
        int oldCount = supplement.getTotalReviews();
        double newRating = entityReview.getRating();

        double newAvg = (oldAvg * oldCount + newRating) / (oldCount + 1);

        supplement.setAverageRating(newAvg);
        supplement.setTotalReviews(oldCount + 1);


        return repo.save(entityReview);
    }
}
