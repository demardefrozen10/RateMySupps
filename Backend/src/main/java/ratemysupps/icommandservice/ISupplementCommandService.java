package ratemysupps.icommandservice;

import ratemysupps.readmodel.ReadSupplement;
import ratemysupps.writemodel.WriteSupplement;

public interface ISupplementCommandService {

    public ReadSupplement submitSupplement(WriteSupplement supplement);


}
