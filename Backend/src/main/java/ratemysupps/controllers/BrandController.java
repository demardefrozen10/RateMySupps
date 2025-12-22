package ratemysupps.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ratemysupps.entity.Brand;
import ratemysupps.icommandservice.IBrandCommandService;
import ratemysupps.iqueryservice.IBrandQueryService;
import ratemysupps.readmodel.ReadBrand;
import ratemysupps.writemodel.WriteBrand;

import java.util.List;

@RestController
@RequestMapping("/api/brand")
public class BrandController {


    private final IBrandQueryService queryRepo;
    private final IBrandCommandService commandRepo;

    @Autowired
    public BrandController(IBrandQueryService queryRepo, IBrandCommandService commandRepo) {
        this.queryRepo = queryRepo;
        this.commandRepo = commandRepo;
    }

    @GetMapping("/getBrand")
    public List<ReadBrand> getBrandByName(@RequestParam String name){

        return queryRepo.getBrandByName(name);

    }

    @PostMapping("/createBrand")
    public ResponseEntity<Brand> createBrand(@RequestBody @Valid WriteBrand brand) {
        Brand created = commandRepo.submitBrand(brand);

        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }


}
