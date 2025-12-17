package ratemysupps.queryrepo;

import org.springframework.stereotype.Component;
import ratemysupps.entity.Brand;
import ratemysupps.iqueryrepo.IBrandQueryRepo;
import ratemysupps.repository.IBrandRepository;

import java.util.List;

@Component
public class BrandQueryRepo implements IBrandQueryRepo {

    IBrandRepository brandRepo;
    public BrandQueryRepo(IBrandRepository brandRepo) {
        this.brandRepo = brandRepo;
    }

    public List<Brand> getBrandByName(String name) {

        return brandRepo.findBybrandNameContainingIgnoreCase(name);
    }

    @Override
    public List<Brand> getAllBrands() {
        return brandRepo.findAll();
    }
}