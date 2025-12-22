package ratemysupps.iqueryservice;

import ratemysupps.readmodel.ReadSupplement;
import ratemysupps.readmodel.ReadSupplementComplex;

import java.util.List;

public interface ISupplementQueryService {

    List<ReadSupplement> getAllSupplementsByBrand(Long brandId);

    ReadSupplementComplex getSupplementById(Long supplementId);
}
