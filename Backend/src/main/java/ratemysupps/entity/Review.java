package ratemysupps.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity(name="review")
@Getter
@Setter
public class Review {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(nullable=false)
    private String username;

    @Column(nullable = false)
    private double rating;

    @Column(nullable = false, length = 200)
    private String comment;

    @Column(nullable = false)
    private boolean isVerified;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplement_id")
    private Supplement supplement;

    private List<String> imageUrls;

    private String purchaseImageUrl;

    @Column(nullable = false)
    private LocalDateTime createdAt;
}
