package ratemysupps.iqueryservice;

import ratemysupps.entity.Supplement;
import ratemysupps.readmodel.ReadSupplement;
import ratemysupps.readmodel.ReadSupplementComplex;
import org.springframework.data.domain.Sort;
import java.util.List;

public interface ISupplementQueryService {

    List<ReadSupplement> getAllSupplementsByBrand(Long brandId);

    ReadSupplementComplex getSupplementById(Long supplementId);

    List<String> getCategories();
    List<ReadSupplement> searchSupplementsByMinRating(Double minRating, Sort sort);
    List<ReadSupplement> getTopRatedSupplements();
    List<ReadSupplement> getMostReviewedSupplements();
    List<ReadSupplement>searchSupplementsByExactRating(Double rating);
    List<ReadSupplement> searchSupplementsByName(String name);
    List<ReadSupplement> getSupplementsByBrand(Long brandId, String search, String filter, String sortOption);

}
