package lk.ijse.dreamnest_finalproject.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDTO {
    private String firstName;
    private String lastName;
    private String country;
    private String email;
    private String password;
    private String role;

    public UserDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
