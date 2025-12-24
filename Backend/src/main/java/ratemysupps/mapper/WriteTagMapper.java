package ratemysupps.mapper;

import ratemysupps.entity.Tag;
import ratemysupps.writemodel.WriteTag;
import org.springframework.stereotype.Component;
@Component
public class WriteTagMapper {
    
    public Tag toEntity(WriteTag WriteTag){ 
        Tag tag = new Tag();
        tag.setName(WriteTag.getName());
        return tag;

    }
}
