package lk.ijse.dreamnest_finalproject.repo;


import lk.ijse.dreamnest_finalproject.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
}
