package ratemysupps.iqueryservice;

import ratemysupps.readmodel.ReadReview;

import java.util.List;

public interface IReviewQueryService {

    List<ReadReview> getReviewBySupplementId(Long supplementId, String sortBy, String sortOrder, String variant, int limit);

}
