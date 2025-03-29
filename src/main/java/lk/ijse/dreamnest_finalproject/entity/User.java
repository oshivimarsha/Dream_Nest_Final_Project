package lk.ijse.dreamnest_finalproject.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.util.UUID;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uid;
    @Column(unique = true)
    private String username;
    private String email;
    private String password;
    private String role;
}