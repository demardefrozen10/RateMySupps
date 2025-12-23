package ratemysupps.iinfraservice;

import ratemysupps.readmodel.ReadS3;


public interface IS3Service {

    public ReadS3 createPresignedUrl(String fileName, String contentType, Long fileSize, String imageType);



}
