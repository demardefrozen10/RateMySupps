package ratemysupps.icommandrepo;

import ratemysupps.entity.Review;
import ratemysupps.writemodel.WriteReview;

public interface IReviewCommandRepo {

    public Review submitReview(WriteReview review);
}
