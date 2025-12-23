package ratemysupps.iinfraservice;

import ratemysupps.infraservice.S3Service;
import ratemysupps.readmodel.ReadS3;

import java.util.Map;

public interface IS3Service {

    public ReadS3 createPresignedUrl(String fileName, String contentType, Long fileSize, String imageType);



}
