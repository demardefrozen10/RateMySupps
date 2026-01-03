package ratemysupps.icommandservice;

import ratemysupps.readmodel.ReadReview;
import ratemysupps.writemodel.WriteReview;

public interface IReviewCommandService {

    public ReadReview submitReview(WriteReview review);

    public ReadReview approveReview(Long reviewId);
}
