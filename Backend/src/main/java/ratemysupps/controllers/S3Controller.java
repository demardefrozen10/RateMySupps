package ratemysupps.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ratemysupps.iinfraservice.IS3Service;
import ratemysupps.readmodel.ReadS3;
import ratemysupps.writemodel.WriteS3;

@RestController
@RequestMapping("/api/s3")
public class S3Controller {

    private final IS3Service s3Service;

    public S3Controller(IS3Service s3Service) {
        this.s3Service = s3Service;
    }

    @PostMapping("/presigned-url")
    public ResponseEntity<ReadS3> createPresignedUrl(@RequestBody WriteS3 request) {
        ReadS3 key = s3Service.createPresignedUrl(
                request.getFileName(),
                request.getContentType(),
                request.getFileSize(),
                request.getImageType()
        );

        return ResponseEntity.ok(key);
    }
}
