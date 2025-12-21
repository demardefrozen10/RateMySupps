package ratemysupps.queryrepo;

import org.springframework.stereotype.Component;
import ratemysupps.entity.Brand;
import ratemysupps.iqueryrepo.IBrandQueryRepo;
import ratemysupps.mapper.ReadBrandMapper;
import ratemysupps.readmodel.ReadBrand;
import ratemysupps.repository.IBrandRepository;

import java.util.List;
import java.util.stream. Collectors;


@Component
public class BrandQueryRepo implements IBrandQueryRepo {

    private ReadBrandMapper mapper;

    IBrandRepository brandRepo;
    public BrandQueryRepo(IBrandRepository brandRepo, ReadBrandMapper mapper) {
        this.brandRepo = brandRepo;
        this.mapper = mapper;
    }

    public List<ReadBrand> getBrandByName(String name) {

        return brandRepo.findBybrandNameContainingIgnoreCase(name).stream().map(mapper::fromEntity).collect(Collectors.toList());
    }

    @Override
    public List<Brand> getAllBrands() {
        return brandRepo.findAll();
    }
}