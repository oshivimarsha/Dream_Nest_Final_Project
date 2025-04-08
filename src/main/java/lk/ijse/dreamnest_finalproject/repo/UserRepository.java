package lk.ijse.dreamnest_finalproject.repo;


import lk.ijse.dreamnest_finalproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User,String> {

    User findByEmail(String userName);

    boolean existsByEmail(String userName);

    int deleteByEmail(String userName);

    @Modifying
    @Query(value = "UPDATE user u SET u.password = ?2 WHERE u.username = ?1", nativeQuery = true)
    void updatepassword(String name, String password);

}