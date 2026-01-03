package ratemysupps.commandservice;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
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
    private final IBrandRepository brandRepo;

    public SupplementCommandService(WriteSupplementMapper writeMapper, ISupplementRepository suppRepo, ReadSupplementMapper readMapper, IBrandRepository brandRepo) {
        this.writeMapper = writeMapper;
        this.suppRepo = suppRepo;
        this.readMapper = readMapper;
        this.brandRepo = brandRepo;
    }

    @Override
    public ReadSupplement submitSupplement(WriteSupplement supplement) {

        Brand brand = brandRepo.findById(supplement.getBrandId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Brand not found"
                ));

        Category category = supplement.getCategory();
        Supplement entitySupplement = writeMapper.toEntity(supplement, category, brand);

        suppRepo.save(entitySupplement);
        return readMapper.fromEntity(entitySupplement);
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
}