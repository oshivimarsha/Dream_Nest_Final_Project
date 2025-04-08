package lk.ijse.dreamnest_finalproject.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDTO {
    private Long uid;
    private String username;
    private String email;
    private String password;
    private String role;

    public UserDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
