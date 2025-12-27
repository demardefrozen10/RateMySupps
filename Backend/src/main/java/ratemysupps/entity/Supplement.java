package ratemysupps.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity(name="supplement")
@Getter
@Setter
public class Supplement {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id", nullable = false)
    @JsonIgnore
    private Brand brand;

    @Column(nullable = false)
    private String supplementName;

    private Double averageRating;

    private Integer totalReviews;

    private String description;

    @Column(nullable = false)
    private boolean isVerified;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    
    @ElementCollection
    @Column(name = "image_url")
    private List<String> imageUrl = new ArrayList<>();

    @ElementCollection
    @Column(name = "serving_size")
    private List<String> servingSizes = new ArrayList<>();


    @Column(nullable = false, columnDefinition = "TEXT")
    private String websiteUrl;

    

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "supplement_tag",
            joinColumns = @JoinColumn(name = "supplement_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    @JsonIgnore
    private Category category;



    @OneToMany(mappedBy = "supplement", orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

}