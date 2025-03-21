package lk.ijse.dreamnest_finalproject.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnore
    private PlaceCategory category;
    private String description;
    private String location;
    private String latitude;
    private String longitude;

    @ElementCollection
    @CollectionTable(name = "place_images", joinColumns = @JoinColumn(name = "place_id"))
    @Column(name = "image_path")
    private List<String> image;

    public Place(String name, PlaceCategory category, String description, String location, String latitude, String longitude, List<String> image) {
        this.name = name;
        this.category = category;
        this.description = description;
        this.location = location;
        this.latitude = latitude;
        this.longitude = longitude;
        this.image = image;
    }
}
