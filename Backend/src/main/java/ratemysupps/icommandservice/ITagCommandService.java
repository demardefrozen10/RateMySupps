package ratemysupps.icommandservice;

import ratemysupps.entity.Tag;
import ratemysupps.readmodel.ReadTag;
import ratemysupps.writemodel.WriteTag;

public interface ITagCommandService {

    public ReadTag submitTag(WriteTag tag);

}
