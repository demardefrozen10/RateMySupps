package ratemysupps.iqueryservice;

import ratemysupps.entity.Brand;
import ratemysupps.readmodel.ReadBrand;

import java.util.List;

import lombok.Locked.Read;

public interface IBrandQueryService {

    public ReadBrand getBrandById(Long brandId);

    public List<ReadBrand> getBrandByName(String name);

    public List<Brand> getAllBrands();

}
