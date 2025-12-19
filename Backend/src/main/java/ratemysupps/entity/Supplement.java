package ratemysupps.entity;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity(name="supplement")
@Getter
@Setter
public class Supplement {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id", nullable = false)
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

    @Column(unique = true)
    private String imageUrl;

    @ManyToMany
    @JoinTable(
            name = "supplement_tag",
            joinColumns = @JoinColumn(name = "supplement_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags;

}