package ratemysupps.commandservice;

import org.springframework.stereotype.Service;
import ratemysupps.entity.Brand;
import ratemysupps.icommandservice.IBrandCommandService;
import ratemysupps.repository.IBrandRepository;
import ratemysupps.mapper.WriteBrandMapper;
import ratemysupps.writemodel.WriteBrand;

@Service
public class BrandCommandService implements IBrandCommandService {

    private final WriteBrandMapper mapper;
    private final IBrandRepository repo;
    public BrandCommandService(WriteBrandMapper mapper, IBrandRepository repo) {
        this.mapper = mapper;
        this.repo = repo;
    }

    @Override
    public Brand submitBrand(WriteBrand brand) {
        return repo.save(mapper.toEntity(brand));
    }
}
