package ratemysupps.entity;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity(name="supplement")
public class Supplement {


    @Id
    @ManyToOne
    @JoinColumn(name = "brandName", referencedColumnName = "brandName")
    private Brand brand;

    @Id
    @Column(nullable = false)
    private String supplementName;

    private Double averageRating;

    private int totalReviews;


    public class SupplementId implements Serializable {
        private Brand brand;
        private String supplementName;
    }

}

