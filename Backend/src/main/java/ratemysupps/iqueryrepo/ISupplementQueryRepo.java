package ratemysupps.iqueryrepo;

import ratemysupps.readmodel.ReadSupplement;

import java.util.List;

public interface ISupplementQueryRepo {

    public List<ReadSupplement> getAllSupplementsByBrand(Long brandId);
}
