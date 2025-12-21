package ratemysupps.controllers;


import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ratemysupps.entity.Brand;
import ratemysupps.entity.Review;
import ratemysupps.icommandrepo.IReviewCommandRepo;
import ratemysupps.iqueryrepo.IReviewQueryRepo;
import ratemysupps.readmodel.ReadReview;
import ratemysupps.repository.IReviewRepository;
import ratemysupps.writemodel.WriteBrand;
import ratemysupps.writemodel.WriteReview;

import java.util.List;

@RestController
@RequestMapping("/api/review")

public class ReviewController {

    IReviewCommandRepo commandRepo;
    IReviewQueryRepo queryRepo;
    public ReviewController(IReviewCommandRepo commandRepo, IReviewQueryRepo repo) {
        this.commandRepo = commandRepo;
        this.queryRepo = repo;
    }


    @GetMapping("/getReviews")
    public List<ReadReview> getReviewBySupplementId(@RequestParam Long supplementId) {
        return queryRepo.getReviewBySupplementId(supplementId);
    }

    @PostMapping("/createReview")
    public ResponseEntity<Review> createReview(@RequestBody @Valid WriteReview review) {
        Review created = commandRepo.submitReview(review);

        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

}
