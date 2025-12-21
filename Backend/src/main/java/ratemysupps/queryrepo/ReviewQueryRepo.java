package ratemysupps.queryrepo;

import org.springframework.stereotype.Component;
import ratemysupps.entity.Brand;
import ratemysupps.entity.Review;
import ratemysupps.iqueryrepo.IBrandQueryRepo;
import ratemysupps.iqueryrepo.IReviewQueryRepo;
import ratemysupps.mapper.ReadBrandMapper;
import ratemysupps.mapper.ReadReviewMapper;
import ratemysupps.readmodel.ReadBrand;
import ratemysupps.readmodel.ReadReview;
import ratemysupps.repository.IBrandRepository;
import ratemysupps.repository.IReviewRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream. Collectors;


@Component
public class ReviewQueryRepo implements IReviewQueryRepo {

    private ReadReviewMapper mapper;

    IReviewRepository reviewRepo;
    public ReviewQueryRepo(IReviewRepository reviewRepo, ReadReviewMapper mapper) {
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
}