package lk.ijse.dreamnest_finalproject.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Cab {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Place placeId;
    private String name;
    private String type; // Standard, Luxury, Shuttle
    private String availability_status; // Available/Unavailable
    private String contact_number;
    private String location;
    private String latitude;
    private String longitude;

    @ElementCollection
    @CollectionTable(name = "cab_images", joinColumns = @JoinColumn(name = "hotel_Id"))
    private List<String> image;

    public Cab(Place placeId, String name, String type, String availability_status, String contact_number, String location, String latitude, String longitude, List<String> image) {
        this.placeId = placeId;
        this.name = name;
        this.type = type;
        this.availability_status = availability_status;
        this.contact_number = contact_number;
        this.location = location;
        this.latitude = latitude;
        this.longitude = longitude;
        this.image = image;
    }
}
