package ratemysupps.iqueryrepo;

import ratemysupps.readmodel.ReadSupplement;
import ratemysupps.readmodel.ReadSupplementComplex;

import java.util.List;

public interface ISupplementQueryRepo {

    List<ReadSupplement> getAllSupplementsByBrand(Long brandId);

    ReadSupplementComplex getSupplementById(Long supplementId);
}
