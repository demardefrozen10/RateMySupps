package ratemysupps.infraservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ratemysupps.iinfraservice.IS3Service;
import ratemysupps.readmodel.ReadS3;
import ratemysupps.writemodel.WriteS3;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;


import java.time.Duration;
import java.util.List;
import java.util.UUID;


@Service
public class S3Service implements IS3Service {

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @Value("${aws.s3.region}")
    private String region;

    @Autowired
    private S3Presigner s3Presigner;



    public List<ReadS3> createPresignedUrls(List<WriteS3> requests) {

        return requests.stream().map(request -> {

            if (request.getFileSize() > 9999) {
                throw new IllegalArgumentException(
                        "File too large (max 5MB): " + request.getFileName()
                );
            }

            String key = request.getImageType()
                    + "/"
                    + UUID.randomUUID()
                    + getFileExtension(request.getFileName());

            PutObjectRequest objectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .contentType(request.getContentType())
                    .build();

            PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                    .signatureDuration(Duration.ofMinutes(10))
                    .putObjectRequest(objectRequest)
                    .build();

            PresignedPutObjectRequest presignedRequest =
                    s3Presigner.presignPutObject(presignRequest);

            String uploadUrl = presignedRequest.url().toString();
            String publicUrl = getPublicUrl(key);

            return new ReadS3(uploadUrl, publicUrl);

        }).toList();
    }


    private String getPublicUrl(String key) {
        return String.format("https://%s.s3.%s.amazonaws.com/%s",
                bucketName, region, key);
    }

    private String getFileExtension(String fileName) {
        if (fileName == null || fileName.isEmpty()) {
            return ".jpg";
        }
        int lastDot = fileName.lastIndexOf('.');
        if (lastDot == -1) {
            return ".jpg";
        }
        return fileName.substring(lastDot).toLowerCase();
    }
}