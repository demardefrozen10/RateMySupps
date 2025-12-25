package ratemysupps.icommandservice;
import ratemysupps.readmodel.ReadTag;
import ratemysupps.writemodel.WriteTag;

public interface ITagCommandService {

    public ReadTag submitTag(WriteTag tag);

}
