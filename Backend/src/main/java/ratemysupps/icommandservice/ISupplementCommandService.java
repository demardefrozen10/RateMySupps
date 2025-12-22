package ratemysupps.icommandservice;


import ratemysupps.entity.Supplement;
import ratemysupps.writemodel.WriteSupplement;

public interface ISupplementCommandService {

    public Supplement submitSupplement(WriteSupplement supplement);


}
