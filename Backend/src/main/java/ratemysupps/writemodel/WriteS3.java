package ratemysupps.writemodel;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WriteS3 {
    private String fileName;
    private String contentType;
    private Long fileSize;
    private String imageType;
}
