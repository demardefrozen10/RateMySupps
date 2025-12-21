package ratemysupps.writemodel;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;
import ratemysupps.entity.Supplement;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class WriteReview {

    private String username;

    private double rating;

    private String comment;

    private Long supplementId;

    private List<String> imageUrls;

    private String purchaseImageUrl;

}
