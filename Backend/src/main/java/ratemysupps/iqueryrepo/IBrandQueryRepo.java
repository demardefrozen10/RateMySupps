package ratemysupps.iqueryrepo;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import ratemysupps.entity.Brand;

import java.util.List;
import java.util.Optional;

public interface IBrandQueryRepo {

    public List<Brand> getBrandByName(String name);

    public List<Brand> getAllBrands();
}
