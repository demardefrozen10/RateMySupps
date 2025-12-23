package ratemysupps.readmodel;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReadS3 {
    private String uploadUrl;
    private String publicUrl;

    public ReadS3(String uploadUrl, String publicUrl) {
        this.uploadUrl = uploadUrl;
        this.publicUrl = publicUrl;
    }
}
