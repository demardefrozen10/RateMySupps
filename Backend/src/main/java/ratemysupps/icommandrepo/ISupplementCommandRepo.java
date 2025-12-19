package ratemysupps.icommandrepo;


import ratemysupps.entity.Supplement;
import ratemysupps.writemodel.WriteSupplement;

public interface ISupplementCommandRepo {

    public Supplement submitSupplement(WriteSupplement supplement);


}
