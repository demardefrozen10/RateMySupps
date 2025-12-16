package ratemysupps.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity(name="brand")
public class Brand {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;

    @Column(nullable = false, unique = true)
    private String brandName;

    @Column(length = 1000)
    private String description;

    private String websiteUrl;

    private String country;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private Double averageRating;

    private int totalReviews;

    /*
    CascadeType.ALL
    PERSIST - When you save a Brand, all new Supplements in the list are also saved
    MERGE - When you update a Brand, Supplements are also updated
    REMOVE - When you delete a Brand, all its Supplements are deleted
    REFRESH - When you refresh a Brand from DB, Supplements are refreshed top
    DETACH - When you detach a Brand from persistence context, Supplements are detached too
     */
    @OneToMany(mappedBy = "brand", cascade =  CascadeType.ALL)
    private List<Supplement> supplements;


}
