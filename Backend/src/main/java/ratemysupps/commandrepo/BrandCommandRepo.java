package ratemysupps.commandrepo;

import org.springframework.stereotype.Component;
import ratemysupps.entity.Brand;
import ratemysupps.icommandrepo.IBrandCommandRepo;
import ratemysupps.repository.IBrandRepository;
import ratemysupps.mapper.WriteBrandMapper;
import ratemysupps.writemodel.WriteBrand;

@Component
public class BrandCommandRepo implements IBrandCommandRepo {

    private final WriteBrandMapper mapper;
    private final IBrandRepository repo;
    public BrandCommandRepo(WriteBrandMapper mapper, IBrandRepository repo) {
        this.mapper = mapper;
        this.repo = repo;
    }

    @Override
    public Brand submitBrand(WriteBrand brand) {
        return repo.save(mapper.toEntity(brand));
    }
}
