package ratemysupps.icommandservice;

import ratemysupps.entity.Brand;
import ratemysupps.writemodel.WriteBrand;

public interface IBrandCommandService {

    public Brand submitBrand(WriteBrand brand);


}
