package ratemysupps.readmodel;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class ReadReview {

    private Long id;

    private String username;

    private double rating;

    private String comment;

    private List<String> imageUrls;
}
