package ratemysupps.commandservice;

import org.springframework.stereotype.Service;
import ratemysupps.icommandservice.IBrandCommandService;
import ratemysupps.repository.IBrandRepository;
import ratemysupps.mapper.ReadBrandMapper;
import ratemysupps.mapper.WriteBrandMapper;
import ratemysupps.readmodel.ReadBrand;
import ratemysupps.writemodel.WriteBrand;

@Service
public class BrandCommandService implements IBrandCommandService {

    private final WriteBrandMapper writeMapper;
    private final ReadBrandMapper readMapper;
    private final IBrandRepository repo;
    public BrandCommandService(WriteBrandMapper writeMapper, IBrandRepository repo, ReadBrandMapper readMapper) {
        this.writeMapper = writeMapper;
        this.repo = repo;
        this.readMapper = readMapper;
    }

    @Override
    public ReadBrand submitBrand(WriteBrand brand) {
        return readMapper.fromEntity(repo.save(writeMapper.toEntity(brand)));
    }
}
