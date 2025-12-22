package ratemysupps.commandservice;

import org.springframework.stereotype.Service;
import ratemysupps.entity.Supplement;
import ratemysupps.icommandservice.ISupplementCommandService;
import ratemysupps.mapper.WriteSupplementMapper;
import ratemysupps.repository.ISupplementRepository;
import ratemysupps.writemodel.WriteSupplement;

@Service
public class SupplementCommandService implements ISupplementCommandService {


    private final WriteSupplementMapper mapper;
    private final ISupplementRepository repo;

    public SupplementCommandService(WriteSupplementMapper mapper, ISupplementRepository repo) {
        this.mapper = mapper;
        this.repo = repo;
    }


    @Override
    public Supplement submitSupplement(WriteSupplement supplement) {
        return repo.save(mapper.toEntity(supplement));
    }
}
