package ratemysupps.controllers;


import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ratemysupps.icommandservice.IReviewCommandService;
import ratemysupps.iqueryservice.IReviewQueryService;
import ratemysupps.readmodel.ReadReview;
import ratemysupps.writemodel.WriteReview;

import java.util.List;

@RestController
@RequestMapping("/api/review")

public class ReviewController {

    IReviewCommandService commandRepo;
    IReviewQueryService queryRepo;
    public ReviewController(IReviewCommandService commandRepo, IReviewQueryService repo) {
        this.commandRepo = commandRepo;
        this.queryRepo = repo;
    }

    @GetMapping("/getReviews")
public List<ReadReview> getReviewBySupplementId(
    @RequestParam Long supplementId, 
    @RequestParam(required = false) String sortBy, 
    @RequestParam(required = false) String sortOrder, 
    @RequestParam(required = false) String variant,
    @RequestParam(defaultValue = "5") int limit 
) {
    return queryRepo.getReviewBySupplementId(supplementId, sortBy, sortOrder, variant, limit);
}

    @PostMapping("/createReview")
    public ResponseEntity<ReadReview> createReview(@RequestBody @Valid WriteReview review) {
        ReadReview created = commandRepo.submitReview(review);

        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }



}
