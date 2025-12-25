package ratemysupps.commandservice;

import org.springframework.stereotype.Service;
import ratemysupps.entity.Category;
import ratemysupps.entity.Supplement;
import ratemysupps.icommandservice.ISupplementCommandService;
import ratemysupps.mapper.ReadSupplementMapper;
import ratemysupps.mapper.WriteSupplementMapper;
import ratemysupps.readmodel.ReadSupplement;
import ratemysupps.repository.ISupplementRepository;
import ratemysupps.repository.ICategoryRepository;
import ratemysupps.writemodel.WriteSupplement;

import java.util.Optional;

@Service
public class SupplementCommandService implements ISupplementCommandService {


    private final WriteSupplementMapper writeMapper;
    private final ReadSupplementMapper readMapper;
    private final ISupplementRepository suppRepo;
    private final ICategoryRepository categoryRepo;

    public SupplementCommandService(WriteSupplementMapper writeMapper, ISupplementRepository suppRepo, ICategoryRepository categoryRepo, ReadSupplementMapper readMapper) {
        this.writeMapper = writeMapper;
        this.suppRepo = suppRepo;
        this.categoryRepo = categoryRepo;
        this.readMapper = readMapper;
    }


    @Override
    public ReadSupplement submitSupplement(WriteSupplement supplement) {

        Category category = categoryRepo
                .findByName(supplement.getCategory())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Category not found: " + supplement.getCategory()
                        )
                );

        Supplement entitySupplement = writeMapper.toEntity(supplement);

        entitySupplement.setCategory(category);

        suppRepo.save(entitySupplement);

        return readMapper.fromEntity(entitySupplement);
    }
}
