package lk.ijse.dreamnest_finalproject.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Place placeID;
    private String name;
    private String email;
    private String description;
    private String location;
    private String latitude;
    private String longitude;
    @ElementCollection
    @CollectionTable(name = "hotel_images",
            joinColumns = @JoinColumn(name = "hotel_id"))
    private List<String> image;

    public Hotel(Place placeID, String name, String email, String description, String location, String latitude, String longitude, List<String> image) {
        this.placeID = placeID;
        this.name = name;
        this.email = email;
        this.description = description;
        this.location = location;
        this.latitude = latitude;
        this.longitude = longitude;
        this.image = image;
    }

    public Hotel(Long id, Place placeID, String name, String description, String location, String latitude, String longitude) {
        this.id = id;
        this.placeID = placeID;
        this.name = name;
        this.email = email;
        this.description = description;
        this.location = location;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
