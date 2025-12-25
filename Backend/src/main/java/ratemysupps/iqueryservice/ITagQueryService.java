package ratemysupps.iqueryservice;

import java.util.List;
import ratemysupps.readmodel.ReadTag;

public interface ITagQueryService {

    List<ReadTag> findAllTags();
    List<ReadTag> findByNameContainingIgnoreCase(String keyword);
    List<ReadTag> findBySupplements_Id(Long supplementId);
    
}
