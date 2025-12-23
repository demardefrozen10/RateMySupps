package ratemysupps.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "supplement_variant")
@Getter
@Setter
public class SupplementVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplement_id", nullable = false)
    private Supplement supplement;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private VariantType type;


    private Boolean isDiscontinued = false;
}

