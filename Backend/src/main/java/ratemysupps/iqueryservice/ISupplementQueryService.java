package ratemysupps.iqueryservice;

import ratemysupps.readmodel.ReadSupplement;
import org.springframework.data.domain.Sort;
import java.util.List;

public interface ISupplementQueryService {

    List<ReadSupplement> getAllSupplementsByBrand(Long brandId);

    ReadSupplement getSupplementById(Long supplementId);

    List<String> getCategories();
    List<ReadSupplement> searchSupplementsByMinRating(Double minRating, Sort sort);
    List<ReadSupplement> getTopRatedSupplements();
    List<ReadSupplement> getMostReviewedSupplements();
    List<ReadSupplement>searchSupplementsByExactRating(Double rating);
    List<ReadSupplement> searchSupplementsByName(String name);
    List<ReadSupplement> getSupplementsByBrand(Long brandId, String search, String filter, String sortOption);
    List<String> getVariantsBySupplementId(Long supplementId);
    List<ReadSupplement> getRecommendations(Long supplementId);
    List<ReadSupplement> getNotApprovedSupplements();

}