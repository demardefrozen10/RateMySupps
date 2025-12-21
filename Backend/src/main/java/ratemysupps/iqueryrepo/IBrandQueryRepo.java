package ratemysupps.iqueryrepo;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import ratemysupps.entity.Brand;
import ratemysupps.readmodel.ReadBrand;

import java.util.List;
import java.util.Optional;

public interface IBrandQueryRepo {

    public List<ReadBrand> getBrandByName(String name);

    public List<Brand> getAllBrands();

}
