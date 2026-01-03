package ratemysupps.iqueryservice;

import ratemysupps.entity.Brand;
import ratemysupps.readmodel.ReadBrand;

import java.util.List;


public interface IBrandQueryService {

    public ReadBrand getBrandById(Long brandId);

    public List<ReadBrand> getBrandByName(String name);

    public List<Brand> getAllBrands();

    public double averageRatingByBrandId(Long id);

    public int countReviewsByBrandId(Long id);

}
