package ratemysupps.controllers;


import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ratemysupps.icommandservice.ISupplementCommandService;
import ratemysupps.iqueryservice.ISupplementQueryService;
import ratemysupps.readmodel.ReadSupplement;
import ratemysupps.writemodel.WriteSupplement;
import org.springframework.data.domain.Sort;


import java.util.List;

@RestController
@RequestMapping("/api/supplement")
public class SupplementController {

    private final ISupplementCommandService commandRepo;
    private final ISupplementQueryService queryRepo;


    @Autowired
    public SupplementController(ISupplementQueryService queryRepo, ISupplementCommandService commandRepo) {
        this.queryRepo = queryRepo;
        this.commandRepo = commandRepo;
    }


    @GetMapping("/getSupplements")
    public List<ReadSupplement> getSupplementsByBrandId(@RequestParam Long brandId) {
        return queryRepo.getAllSupplementsByBrand(brandId);
    }

    @GetMapping("/getSupplement")
    public ResponseEntity<ReadSupplement> getSupplementById(@RequestParam Long supplementId) {
        ReadSupplement supplement = queryRepo.getSupplementById(supplementId);
        return ResponseEntity.ok(supplement);
    }

    @GetMapping("/getCategories")
    public List<String> getAllCategories() {
        return queryRepo.getCategories();
    }

    @PostMapping("/createSupplement")
    public ResponseEntity<ReadSupplement> createSupplement(@RequestBody @Valid WriteSupplement supplement) {
        ReadSupplement created = commandRepo.submitSupplement(supplement);

        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

     @GetMapping("/filterByRating")
    public List<ReadSupplement> filterByRating(
            @RequestParam Double minRating,
            @RequestParam(defaultValue = "averageRating") String sortBy,
            @RequestParam(defaultValue = "desc") String sortOrder
    ) {
        Sort.Direction direction = sortOrder.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sort = Sort.by(direction, sortBy);
        return queryRepo.searchSupplementsByMinRating(minRating, sort);
    }


    @GetMapping("/top-rated")
    public List<ReadSupplement> getTopRated() {
        return queryRepo.getTopRatedSupplements();
    }

    @GetMapping("/most-reviewed")
    public List<ReadSupplement> getMostReviewed() {
        return queryRepo.getMostReviewedSupplements();
    }

    @GetMapping("/searchByExactRating")
    public List<ReadSupplement> searchByExactRating( @RequestParam Double rating) {
        return queryRepo.searchSupplementsByExactRating(rating);
    }

    @GetMapping("/searchByName")
    public List<ReadSupplement> searchByName(@RequestParam String name) {
        return queryRepo.searchSupplementsByName(name);
    }

}
