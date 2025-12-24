package ratemysupps.icommandservice;

import ratemysupps.entity.Review;
import ratemysupps.writemodel.WriteReview;

public interface IReviewCommandService {

    public Review submitReview(WriteReview review);
}
