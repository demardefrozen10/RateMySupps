package ratemysupps.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ratemysupps.entity.Brand;
import ratemysupps.icommandrepo.IBrandCommandRepo;
import ratemysupps.iqueryrepo.IBrandQueryRepo;
import ratemysupps.writemodel.WriteBrand;

import java.util.List;

@RestController
public class BrandController {


    private final IBrandQueryRepo queryRepo;
    private final IBrandCommandRepo commandRepo;

    @Autowired
    public BrandController(IBrandQueryRepo queryRepo, IBrandCommandRepo commandRepo) {
        this.queryRepo = queryRepo;
        this.commandRepo = commandRepo;
    }

    @GetMapping("/api/brand/getBrand")
    public List<Brand> getBrandByName(@RequestParam String name){

        return queryRepo.getBrandByName(name);

    }

    @PostMapping("/api/brand/createBrand")
    public ResponseEntity<Brand> createBrand(@RequestBody @Valid WriteBrand brand) {
        Brand created = commandRepo.submitBrand(brand);

        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }


}
