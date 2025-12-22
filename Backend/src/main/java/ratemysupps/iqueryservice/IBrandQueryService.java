package ratemysupps.iqueryservice;

import ratemysupps.entity.Brand;
import ratemysupps.readmodel.ReadBrand;

import java.util.List;

public interface IBrandQueryService {

    public List<ReadBrand> getBrandByName(String name);

    public List<Brand> getAllBrands();

}
