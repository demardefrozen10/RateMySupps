package ratemysupps.iinfraservice;

import ratemysupps.readmodel.ReadS3;
import ratemysupps.writemodel.WriteS3;

import java.util.List;


public interface IS3Service {

    public List<ReadS3> createPresignedUrls(List<WriteS3> request);



}
