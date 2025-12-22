package ratemysupps.controllers;


import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ratemysupps.entity.Supplement;
import ratemysupps.icommandservice.ISupplementCommandService;
import ratemysupps.iqueryservice.ISupplementQueryService;
import ratemysupps.readmodel.ReadSupplement;
import ratemysupps.readmodel.ReadSupplementComplex;
import ratemysupps.writemodel.WriteSupplement;

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
    public ResponseEntity<ReadSupplementComplex> getSupplementById(@RequestParam Long supplementId) {
        ReadSupplementComplex supplement = queryRepo.getSupplementById(supplementId);
        return ResponseEntity.ok(supplement);
    }

    @PostMapping("/createSupplement")
    public ResponseEntity<Supplement> createBrand(@RequestBody @Valid WriteSupplement supplement) {
        Supplement created = commandRepo.submitSupplement(supplement);

        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }



}
