package ratemysupps.icommandservice;

import ratemysupps.entity.Tag;
import ratemysupps.writemodel.WriteTag;

public interface ITagCommandService {

    public Tag submitTag(WriteTag tag);

}
