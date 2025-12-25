package ratemysupps.commandservice;

import org.springframework.stereotype.Service;
import ratemysupps.icommandservice.ISupplementCommandService;
import ratemysupps.mapper.ReadSupplementMapper;
import ratemysupps.mapper.WriteSupplementMapper;
import ratemysupps.readmodel.ReadSupplement;
import ratemysupps.repository.ISupplementRepository;
import ratemysupps.writemodel.WriteSupplement;

@Service
public class SupplementCommandService implements ISupplementCommandService {


    private final WriteSupplementMapper writeMapper;
    private final ReadSupplementMapper readMapper;
    private final ISupplementRepository repo;

    public SupplementCommandService(WriteSupplementMapper writeMapper, ReadSupplementMapper readMapper, ISupplementRepository repo) {
        this.writeMapper = writeMapper;
        this.readMapper = readMapper;
        this.repo = repo;
    }


    @Override
    public ReadSupplement submitSupplement(WriteSupplement supplement) {
        return readMapper.fromEntity(repo.save(writeMapper.toEntity(supplement)));
    }
}
