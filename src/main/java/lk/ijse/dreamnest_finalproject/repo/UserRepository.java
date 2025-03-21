package lk.ijse.dreamnest_finalproject.repo;


import lk.ijse.dreamnest_finalproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,String> {

    User findByEmail(String userName);

    boolean existsByEmail(String userName);

    int deleteByEmail(String userName);

}