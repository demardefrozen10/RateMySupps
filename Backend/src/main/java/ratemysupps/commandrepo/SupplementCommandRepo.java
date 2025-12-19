package ratemysupps.commandrepo;

import org.springframework.stereotype.Component;
import ratemysupps.entity.Supplement;
import ratemysupps.icommandrepo.ISupplementCommandRepo;
import ratemysupps.mapper.WriteBrandMapper;
import ratemysupps.mapper.WriteSupplementMapper;
import ratemysupps.repository.ISupplementRepository;
import ratemysupps.writemodel.WriteSupplement;

@Component
public class SupplementCommandRepo implements ISupplementCommandRepo {


    private final WriteSupplementMapper mapper;
    private final ISupplementRepository repo;

    public SupplementCommandRepo(WriteSupplementMapper mapper, ISupplementRepository repo) {
        this.mapper = mapper;
        this.repo = repo;
    }


    @Override
    public Supplement submitSupplement(WriteSupplement supplement) {
        return repo.save(mapper.toEntity(supplement));
    }
}
