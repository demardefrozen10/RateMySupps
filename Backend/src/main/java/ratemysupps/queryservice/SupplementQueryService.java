package ratemysupps.queryservice;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ratemysupps.entity.Supplement;
import ratemysupps.iqueryservice.ISupplementQueryService;
import ratemysupps.mapper.ReadSupplementMapper;
import ratemysupps.readmodel.ReadSupplement;
import ratemysupps.readmodel.ReadSupplementComplex;
import ratemysupps.repository.ISupplementRepository;
import ratemysupps.repository.ICategoryRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SupplementQueryService implements ISupplementQueryService {


    private final ReadSupplementMapper mapper;
    private final ISupplementRepository repo;
    private final ICategoryRepository categoryRepo;
    public SupplementQueryService(ReadSupplementMapper mapper, ISupplementRepository repo, ICategoryRepository categoryRepo) {
        this.mapper = mapper;
        this.repo = repo;
        this.categoryRepo = categoryRepo;
    }

    @Override
    public List<ReadSupplement> getAllSupplementsByBrand(Long brandId) {
        return repo.findByBrandId(brandId)
                .stream()
                .map(mapper::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public ReadSupplementComplex getSupplementById(Long supplementId) {
        Supplement supplement = repo.findById(supplementId).orElseThrow(() -> new RuntimeException("Supplement not found with ID: " + supplementId));

        return mapper.fromEntityComplex(supplement);

    }

    @Override
    public List<String> getCategories() {
        return mapper.fromEntityVariant(categoryRepo.findAll());
    }



    public List<ReadSupplement> searchSupplementsByMinRating(Double minRating, Sort sort) {
        return repo.findByAverageRatingGreaterThanEqual(minRating, sort)
                .stream()
                .map(mapper::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReadSupplement> getTopRatedSupplements() {
        return repo.findByOrderByAverageRatingDesc()
                .stream()
                .map(mapper::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReadSupplement> getMostReviewedSupplements() {
        return repo.findByOrderByTotalReviewsDesc()
                .stream()
                .map(mapper::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReadSupplement> searchSupplementsByExactRating(Double rating) {
        return repo.findByAverageRating(rating)
                .stream()
                .map(mapper::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReadSupplement> searchSupplementsByName(String name) {
        return repo.findBySupplementNameContainingIgnoreCase(name)
                .stream()
                .map(mapper::fromEntity)
                .collect(Collectors.toList());
    }

    

    
}
