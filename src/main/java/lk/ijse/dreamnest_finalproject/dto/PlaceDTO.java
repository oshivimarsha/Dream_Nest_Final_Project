package lk.ijse.dreamnest_finalproject.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@NoArgsConstructor
@Getter
@Setter
public class PlaceDTO {
    private String id;
    private String name;
    private String description;
    private String location;
    private String latitude;
    private String longitude;
    private List<String> image;

    public PlaceDTO(String name, String categoryID, String description, String location, String latitude, String longitude, List<String> image) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.latitude = latitude;
        this.longitude = longitude;
        this.image = image;
    }

    public PlaceDTO(String id, String name, String categoryID, String description, String location, String latitude, String longitude) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.location = location;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
