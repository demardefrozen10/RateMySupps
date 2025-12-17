package ratemysupps.writemodel;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class WriteBrand {

    private String brandName;

    private String description;

    private String websiteUrl;

    private String country;

    private String imageUrl;
}
