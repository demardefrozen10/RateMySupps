package ratemysupps.queryservice;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import org.springframework.web.server.ResponseStatusException;
import ratemysupps.entity.Supplement;
import ratemysupps.iqueryservice.ISupplementQueryService;
import ratemysupps.mapper.ReadSupplementMapper;
import ratemysupps.readmodel.ReadSupplement;
import ratemysupps.repository.ISupplementRepository;
import ratemysupps.repository.ICategoryRepository;

import java.util.ArrayList;
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
    return repo.findAllWithReviewsByBrandId(brandId) 
            .stream()
            .map(mapper::fromEntity)
            .collect(Collectors.toList());
}


    @Override
    public ReadSupplement getSupplementById(Long supplementId) {
        Supplement supplement = repo.findById(supplementId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Supplement not found with ID: " + supplementId
                ));

        return mapper.fromEntity(supplement);
    }

    @Override
    public List<String> getCategories() {
        return categoryRepo.findAll()
                .stream()
                .map(category -> category.getName()) 
                .collect(Collectors.toList());
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

@Override
public List<ReadSupplement> getSupplementsByBrand(Long brandId, String search, String filter, String sortOption) {

    Sort sortObj = Sort.by(Sort.Direction.ASC, "supplementName");
    if (sortOption != null) {
        if (sortOption.equalsIgnoreCase("highest-rated")) {
            sortObj = Sort.by(Sort.Direction.DESC, "averageRating");
        } else if (sortOption.equalsIgnoreCase("most-reviews")) {
            sortObj = Sort.by(Sort.Direction.DESC, "totalReviews");
        } else if (sortOption.equalsIgnoreCase("a-z")) {
            sortObj = Sort.by(Sort.Direction.ASC, "supplementName");
        }
    }

    String searchParam = null;
    if (search != null && !search.trim().isEmpty()) {
        searchParam = "%" + search.trim().toLowerCase() + "%";
    }

    String filterParam = null;
    if (filter != null && !filter.trim().isEmpty()) {
        filterParam = filter.trim().toLowerCase();
    }

    return repo.findByBrandWithFilters(brandId, searchParam, filterParam, sortObj)
               .stream()
               .map(mapper::fromEntity)
               .toList();
}

@Override
public List<String> getVariantsBySupplementId(Long supplementId) {
    return repo.getVariantsBySupplementId(supplementId);
}

@Override
public List<ReadSupplement> getRecommendations(Long supplementId) {
    Supplement supplement = repo.findById(supplementId)
            .orElseThrow(() -> new RuntimeException("Supplement not found with ID: " + supplementId));

    Long brandId = supplement.getBrand().getId();
    List<Supplement> recommendedSupplements = new ArrayList<>();

    List<Supplement> brandRecommendations = repo.findTop6ByBrand_IdAndIdNotOrderByAverageRating_Desc(brandId, supplementId);
    recommendedSupplements.addAll(brandRecommendations);

     if (supplement.getTags().isEmpty() || recommendedSupplements.size() >= 6) {
        return brandRecommendations.stream()
                .map(mapper::fromEntity)
                .collect(Collectors.toList());
    }

    List<Long> excludeIds = brandRecommendations.stream()
            .map(Supplement::getId)
            .toList();
    excludeIds = new ArrayList<>(excludeIds);
    excludeIds.add(supplementId);

        List<Supplement> tagRecommendations = repo.findByTagsInAndIdNotInOrderByAverageRating_Desc(supplement.getTags().stream().toList(), excludeIds);

    recommendedSupplements.addAll(tagRecommendations);
    return recommendedSupplements.stream()
            .distinct()
            .limit(6)
            .map(mapper::fromEntity)
            .collect(Collectors.toList());
}

}
