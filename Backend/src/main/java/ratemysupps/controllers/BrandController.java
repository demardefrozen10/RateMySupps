package ratemysupps.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
    public ResponseEntity<ReadBrand> getBrandById(@RequestParam Long brandId) {  
    ReadBrand brand = queryRepo.getBrandById(brandId);

    if (brand == null) {
        return ResponseEntity.notFound().build();
    }
    
    return ResponseEntity.ok(brand);  
    }
    
    @GetMapping("/getBrandByName")
    public List<ReadBrand> getBrandByName(@RequestParam String name){

        return queryRepo.getBrandByName(name);

    }

    

    @PostMapping("/createBrand")
    public ResponseEntity<ReadBrand> createBrand(@RequestBody @Valid WriteBrand brand) {
        ReadBrand created = commandRepo.submitBrand(brand);

        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    


}
