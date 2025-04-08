package lk.ijse.dreamnest_finalproject.service;


import lk.ijse.dreamnest_finalproject.dto.UserDTO;

public interface UserService {
    int saveUser(UserDTO userDTO);
    UserDTO searchUser(String username);

    void deleteUser(String email);
    Object getAllUser();

    int resetPassword(UserDTO exuser);

}