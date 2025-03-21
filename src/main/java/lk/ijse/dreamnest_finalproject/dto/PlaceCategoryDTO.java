package lk.ijse.dreamnest_finalproject.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PlaceCategoryDTO {
    private Long id;
    private String name;
    private String description;

    public PlaceCategoryDTO(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
