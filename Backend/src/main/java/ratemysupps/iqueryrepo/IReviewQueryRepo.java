package ratemysupps.iqueryrepo;

import ratemysupps.entity.Review;
import ratemysupps.readmodel.ReadReview;

import java.util.List;

public interface IReviewQueryRepo {

    public List<ReadReview> getReviewBySupplementId(Long supplementId);
}
