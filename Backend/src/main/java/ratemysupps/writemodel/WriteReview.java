package ratemysupps.writemodel;
import lombok.Getter;
import lombok.Setter;
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
