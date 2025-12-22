package ratemysupps.iqueryservice;

import ratemysupps.readmodel.ReadReview;

import java.util.List;

public interface IReviewQueryService {

    public List<ReadReview> getReviewBySupplementId(Long supplementId);
}
