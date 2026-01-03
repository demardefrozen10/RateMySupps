package ratemysupps.writemodel;

import lombok.Getter;
import ratemysupps.entity.Category;

import java.util.List;

@Getter
public class WriteSupplement {

    private String productName;

    private Long brandId;

    private String productType;

    private String productUrl;

    private List<String> imageUrl;

    private List<String> servingSizes;

    private String websiteUrl;

    private Category category;

}