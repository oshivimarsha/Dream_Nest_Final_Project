package lk.ijse.dreamnest_finalproject.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String email;
    private Integer rating;

    @Column(nullable = false, length = 1000)
    private String comment;
    private LocalDateTime createdAt;
    private Boolean approved = false;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
}
