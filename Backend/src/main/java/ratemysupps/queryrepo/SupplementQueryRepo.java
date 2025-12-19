package ratemysupps.queryrepo;

import org.springframework.stereotype.Component;
import ratemysupps.iqueryrepo.ISupplementQueryRepo;
import ratemysupps.mapper.ReadBrandMapper;
import ratemysupps.mapper.ReadSupplementMapper;
import ratemysupps.mapper.WriteBrandMapper;
import ratemysupps.readmodel.ReadSupplement;
import ratemysupps.repository.IBrandRepository;
import ratemysupps.repository.ISupplementRepository;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SupplementQueryRepo implements ISupplementQueryRepo {


    private final ReadSupplementMapper mapper;
    private final ISupplementRepository repo;
    public SupplementQueryRepo(ReadSupplementMapper mapper, ISupplementRepository repo) {
        this.mapper = mapper;
        this.repo = repo;
    }

    @Override
    public List<ReadSupplement> getAllSupplementsByBrand(Long brandId) {
        return repo.findByBrandId(brandId)
                .stream()
                .map(mapper::toEntity)
                .collect(Collectors.toList());
    }
}
