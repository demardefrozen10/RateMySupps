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
    public List<ReadReview> getReviewBySupplementId(@RequestParam Long supplementId) {
        return queryRepo.getReviewBySupplementId(supplementId);
    }

    @PostMapping("/createReview")
    public ResponseEntity<ReadReview> createReview(@RequestBody @Valid WriteReview review) {
        ReadReview created = commandRepo.submitReview(review);

        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/getVerifiedReviews")
    public List<ReadReview> getVerifiedReviewsBySupplementId(@RequestParam Long supplementId) {
        return queryRepo.getVerifiedReviewsBySupplementId(supplementId);
    }

    @GetMapping("/getReviewsByMinRating")
    public List<ReadReview> getReviewsBySupplementIdByMinRating(@RequestParam Long supplementId) {
        return queryRepo.getReviewsBySupplementIdByMinRating(supplementId);
    }


    @GetMapping("/getReviewsByMaxRating")
    public List<ReadReview> getReviewsBySupplementIdByMaxRating(@RequestParam Long supplementId) {
        return queryRepo.getReviewsBySupplementIdByMaxRating(supplementId);
    }

    @GetMapping("/getReviewsByDate")
    public List<ReadReview> getReviewsBySupplementIdByMaxDate(@RequestParam Long supplementId) {
        return queryRepo.getReviewsBySupplementIdByMaxRating(supplementId);
    }


}
