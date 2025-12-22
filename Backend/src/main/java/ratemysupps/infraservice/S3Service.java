package ratemysupps.infraservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software. amazon.awssdk.services. s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model. PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.time.Duration;
import java.util.UUID;
@Service
public class S3Service {

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @Value("${aws.s3.region}")
    private String region;

    @Autowired
    private S3Presigner s3Presigner;


    public PresignedUrlResponse generatePresignedUploadUrl(String fileName, String contentType, Long fileSize) {
        if (fileSize > 5 * 1024 * 1024) { 
            throw new IllegalArgumentException("File too large");
        }

        String key = "reviews/" + UUID.randomUUID() + getFileExtension(fileName);

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentType(contentType)
                .contentLength(fileSize)
                .build();

        PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(5))
                .putObjectRequest(putObjectRequest)
                .build();

        PresignedPutObjectRequest presignedRequest = s3Presigner.presignPutObject(presignRequest);

        String uploadUrl = presignedRequest. url().toString();
        String publicUrl = getPublicUrl(key);

        return new PresignedUrlResponse(uploadUrl, publicUrl, key);
    }

    public String getPublicUrl(String key) {
        return String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, region, key);
    }

    private String getFileExtension(String fileName) {
        int lastDot = fileName.lastIndexOf('.');
        return (lastDot == -1) ? "" : fileName.substring(lastDot).toLowerCase();
    }

    public static class PresignedUrlResponse {
        private String uploadUrl;
        private String publicUrl;
        private String key;

        public PresignedUrlResponse(String uploadUrl, String publicUrl, String key) {
            this.uploadUrl = uploadUrl;
            this. publicUrl = publicUrl;
            this.key = key;
        }

        public String getUploadUrl() { return uploadUrl; }
        public String getPublicUrl() { return publicUrl; }
        public String getKey() { return key; }
    }
}