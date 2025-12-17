package ratemysupps.icommandrepo;

import ratemysupps.entity.Brand;
import ratemysupps.writemodel.WriteBrand;

public interface IBrandCommandRepo {

    public Brand submitBrand(WriteBrand brand);


}
