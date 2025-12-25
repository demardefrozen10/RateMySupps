package ratemysupps.mapper;

import org.springframework.stereotype.Component;

import ratemysupps.entity.Tag;
import ratemysupps.readmodel.ReadTag;

@Component
public class ReadTagMapper {
    public ReadTag fromEntity(Tag tag){ 
        ReadTag readTag = new ReadTag();
        readTag.setId(tag.getId());
        readTag.setName(tag.getName());
        return readTag;

    }
}
