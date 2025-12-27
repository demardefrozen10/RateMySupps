package ratemysupps.commandservice;
import org.springframework.stereotype.Service;
import ratemysupps.entity.Brand;
import ratemysupps.entity.Category;
import ratemysupps.entity.Supplement;
import ratemysupps.icommandservice.ISupplementCommandService;
import ratemysupps.mapper.ReadSupplementMapper;
import ratemysupps.mapper.WriteSupplementMapper;
import ratemysupps.readmodel.ReadSupplement;
import ratemysupps.repository.ISupplementRepository;
import ratemysupps.repository.IBrandRepository;
import ratemysupps.repository.ICategoryRepository;
import ratemysupps.writemodel.WriteSupplement;

import java.time.LocalDateTime;

@Service
public class SupplementCommandService implements ISupplementCommandService {


    private final WriteSupplementMapper writeMapper;
    private final ReadSupplementMapper readMapper;
    private final ISupplementRepository suppRepo;
    private final ICategoryRepository categoryRepo;
    private final IBrandRepository brandRepo;

    public SupplementCommandService(WriteSupplementMapper writeMapper, ISupplementRepository suppRepo, ICategoryRepository categoryRepo, IBrandRepository brandRepo, ReadSupplementMapper readMapper) {
        this.writeMapper = writeMapper;
        this.suppRepo = suppRepo;
        this.categoryRepo = categoryRepo;
        this.brandRepo = brandRepo;
        this.readMapper = readMapper;
    }

    @Override
    public ReadSupplement submitSupplement(WriteSupplement supplement) {

        Brand brand = brandRepo.findById(supplement.getBrandId())
                .orElseThrow(() -> new IllegalArgumentException("Brand not found: " + supplement.getBrandId()));

        Category category = categoryRepo.findByName(supplement.getCategory())
                .orElseThrow(() -> new IllegalArgumentException("Category not found: " + supplement.getCategory()));

        Supplement entitySupplement = writeMapper.toEntity(supplement);

        entitySupplement.setBrand(brand);
        entitySupplement.setCategory(category);
        entitySupplement.setCreatedAt(LocalDateTime.now()); 
        entitySupplement.setAverageRating(0.0);           
        entitySupplement.setTotalReviews(0);       
        suppRepo.save(entitySupplement);
        return readMapper.fromEntity(entitySupplement);
    }
}