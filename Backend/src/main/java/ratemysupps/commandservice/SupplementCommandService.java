package ratemysupps.commandservice;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import ratemysupps.entity.Brand;
import ratemysupps.entity.Category;
import ratemysupps.entity.Supplement;
import ratemysupps.entity.Tag;
import ratemysupps.icommandservice.ISupplementCommandService;
import ratemysupps.mapper.ReadSupplementMapper;
import ratemysupps.mapper.WriteSupplementMapper;
import ratemysupps.readmodel.ReadSupplement;
import ratemysupps.repository.ISupplementRepository;
import ratemysupps.repository.IBrandRepository;
import ratemysupps.repository.ICategoryRepository;
import ratemysupps.repository.ITagRepository;
import ratemysupps.writemodel.UpdateSupplement;
import ratemysupps.writemodel.WriteSupplement;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class SupplementCommandService implements ISupplementCommandService {


    private final WriteSupplementMapper writeMapper;
    private final ReadSupplementMapper readMapper;
    private final ISupplementRepository suppRepo;
    private final IBrandRepository brandRepo;
    private final ICategoryRepository categoryRepo;
    private final ITagRepository tagRepo;

    public SupplementCommandService(WriteSupplementMapper writeMapper, ICategoryRepository categoryRepo, ISupplementRepository suppRepo, ReadSupplementMapper readMapper, IBrandRepository brandRepo, ITagRepository tagRepo) {
        this.writeMapper = writeMapper;
        this.suppRepo = suppRepo;
        this.readMapper = readMapper;
        this.brandRepo = brandRepo;
        this.categoryRepo = categoryRepo;
        this.tagRepo = tagRepo;
    }

    @Override
    public ReadSupplement submitSupplement(WriteSupplement supplement) {

        Brand brand = brandRepo.findById(supplement.getBrandId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Brand not found"
                ));
        Category category = categoryRepo.findByName(supplement.getCategory())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Category not found"
                ));

        Supplement entity = writeMapper.toEntity(supplement, category, brand);


        suppRepo.save(entity);
        return readMapper.fromEntity(entity);
    }

    @Override
    @Transactional
    public ReadSupplement approveSupplement(Long supplementId) {
        Supplement supplement = suppRepo.findById(supplementId).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Supplement not found"
        ));

        supplement.setVerified(true);
        return readMapper.fromEntity(supplement);
    }

    @Override
    @Transactional
    public ReadSupplement updateSupplement(Long supplementId, UpdateSupplement update) {
        Supplement supplement = suppRepo.findById(supplementId).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Supplement not found"
        ));

        if (update.getVariants() != null) {
            supplement.setVariants(update.getVariants());
        }

        if (update.getServingSizes() != null) {
            supplement.setServingSizes(update.getServingSizes());
        }

        if (update.getTagIds() != null) {
            List<Tag> tags = tagRepo.findAllById(update.getTagIds());
            supplement.setTags(new HashSet<>(tags));
        }

        suppRepo.save(supplement);
        return readMapper.fromEntity(supplement);
    }
}