package ratemysupps.commandservice;

import org.springframework.stereotype.Service;
import ratemysupps.entity.Tag;
import ratemysupps.icommandservice.ITagCommandService;
import ratemysupps.repository.ITagRepository;
import ratemysupps.mapper.ReadTagMapper;
import ratemysupps.mapper.WriteTagMapper;
import ratemysupps.readmodel.ReadTag;
import ratemysupps.writemodel.WriteTag;

@Service
public class TagCommandService implements ITagCommandService {

    private final WriteTagMapper writeMapper;
    private final ReadTagMapper readMapper;
    private final ITagRepository repo;
    public TagCommandService(WriteTagMapper writeMapper, ITagRepository repo, ReadTagMapper readMapper) {
        this.writeMapper = writeMapper;
        this.readMapper = readMapper;
        this.repo = repo;
    }

    @Override
    public ReadTag submitTag(WriteTag tag) {

        Tag entityTag = writeMapper.toEntity(tag);

        Tag savedTag = repo.save(entityTag);

        return readMapper.fromEntity(savedTag);
    }

}
