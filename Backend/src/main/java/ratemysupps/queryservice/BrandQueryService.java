package ratemysupps.queryservice;

import org.springframework.stereotype.Service;
import ratemysupps.entity.Brand;
import ratemysupps.iqueryservice.IBrandQueryService;
import ratemysupps.mapper.ReadBrandMapper;
import ratemysupps.readmodel.ReadBrand;
import ratemysupps.repository.IBrandRepository;

import java.util.List;
import java.util.stream. Collectors;


@Service
public class BrandQueryService implements IBrandQueryService {

    private ReadBrandMapper mapper;

    IBrandRepository brandRepo;
    public BrandQueryService(IBrandRepository brandRepo, ReadBrandMapper mapper) {
        this.brandRepo = brandRepo;
        this.mapper = mapper;
    }

    public ReadBrand getBrandById(Long brandId) {
        Brand brand = brandRepo.findById(brandId).orElse(null);
        if (brand == null) {
            return null;
        }
        return mapper.fromEntity(brand);
    }

    public List<ReadBrand> getBrandByName(String name) {

        return brandRepo.findByBrandNameContainingIgnoreCase(name).stream().map(mapper::fromEntity).collect(Collectors.toList());
    }

    @Override
    public List<Brand> getAllBrands() {
        return brandRepo.findAll();
    }
}