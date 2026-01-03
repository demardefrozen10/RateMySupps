package ratemysupps.icommandservice;

import ratemysupps.readmodel.ReadSupplement;
import ratemysupps.writemodel.UpdateSupplement;
import ratemysupps.writemodel.WriteSupplement;

public interface ISupplementCommandService {

    public ReadSupplement submitSupplement(WriteSupplement supplement);

    public ReadSupplement approveSupplement(Long supplementId);

    public ReadSupplement updateSupplement(Long supplementId, UpdateSupplement update);

}
