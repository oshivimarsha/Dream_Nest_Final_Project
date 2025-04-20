package lk.ijse.dreamnest_finalproject.repo;


import lk.ijse.dreamnest_finalproject.entity.Room;
import lk.ijse.dreamnest_finalproject.entity.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomTypeRepository extends JpaRepository<RoomType, Long> {

}
