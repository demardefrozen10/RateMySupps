package ratemysupps.queryservice;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import io.swagger.v3.oas.annotations.servers.Server;
import ratemysupps.entity.Review;
import ratemysupps.entity.Tag;
import ratemysupps.iqueryservice.ITagQueryService;
import ratemysupps.mapper.ReadReviewMapper;
import ratemysupps.mapper.ReadSupplementMapper;
import ratemysupps.mapper.ReadTagMapper;
import ratemysupps.readmodel.ReadReview;
import ratemysupps.readmodel.ReadTag;
import ratemysupps.repository.IReviewRepository;
import ratemysupps.repository.ISupplementRepository;
import ratemysupps.repository.ITagRepository;

@Service
public class TagQueryService implements ITagQueryService{
    
    private final ReadTagMapper mapper;
    private final ITagRepository tagRepo;

    public TagQueryService(ITagRepository tagRepo, ReadTagMapper mapper) {
        this.tagRepo = tagRepo;
        this.mapper = mapper;
    }
  

    @Override
    public List<ReadTag> findAllTags() {
        List<Tag> tags = tagRepo.findAll();
        List<ReadTag> readTags = new ArrayList<>();
        for (Tag tag : tags) {
            readTags.add(mapper.fromEntity(tag));
        }
        return readTags;
    }


    @Override
    public List<ReadTag> findByNameContainingIgnoreCase(String keyword){
        List<Tag> tags = tagRepo.findByNameContainingIgnoreCase(keyword);

        List<ReadTag> readTags = new ArrayList<>();
        for (Tag tag : tags) {
            readTags.add(mapper.fromEntity(tag));
        }

        return readTags;
    }

    @Override
    public List<ReadTag> findBySupplements_Id(Long supplementId){

        List<Tag> tags = tagRepo.findBySupplements_Id(supplementId);

        List<ReadTag> readTags = new ArrayList<>();
        for (Tag tag : tags) {
            readTags.add(mapper.fromEntity(tag));
        }

        return readTags;
    }
    
}
