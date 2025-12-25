package ratemysupps.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ratemysupps.iinfraservice.IS3Service;
import ratemysupps.readmodel.ReadS3;
import ratemysupps.writemodel.WriteS3;

import java.util.List;

@RestController
@RequestMapping("/api/s3")
public class S3Controller {

    IS3Service s3Service;
    public S3Controller(IS3Service s3Service) {
        this.s3Service = s3Service;
    }


    @PostMapping("/presigned-url")
    public ResponseEntity<List<ReadS3>> createPresignedUrl(@RequestBody List<WriteS3> request) {
        List<ReadS3> key = s3Service.createPresignedUrls(request);


        return ResponseEntity.ok(key);
    }
//http://localhost:8080/api/s3/presigned-url
}
