package lk.ijse.dreamnest_finalproject.dto;

import lk.ijse.dreamnest_finalproject.entity.Place;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CabDTO {
    private Long id;
    private String placeId;
    private String name;
    private String type; // Standard, Luxury, Shuttle
    private String availability_status; // Available/Unavailable
    private String contact_number;
    private String location;
    private String latitude;
    private String longitude;
    private List<String> image;
}
