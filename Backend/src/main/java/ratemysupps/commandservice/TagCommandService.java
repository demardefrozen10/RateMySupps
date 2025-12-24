package ratemysupps.commandservice;

import org.springframework.stereotype.Service;
import ratemysupps.entity.Tag;
import ratemysupps.icommandservice.ITagCommandService;
import ratemysupps.repository.ITagRepository;
import ratemysupps.mapper.WriteTagMapper;
import ratemysupps.writemodel.WriteTag;

@Service
public class TagCommandService implements ITagCommandService {

    private final WriteTagMapper mapper;
    private final ITagRepository repo;
    public TagCommandService(WriteTagMapper mapper, ITagRepository repo) {
        this.mapper = mapper;
        this.repo = repo;
    }

    @Override
    public Tag submitTag(WriteTag tag) {
        return repo.save(mapper.toEntity(tag));
    }
}
