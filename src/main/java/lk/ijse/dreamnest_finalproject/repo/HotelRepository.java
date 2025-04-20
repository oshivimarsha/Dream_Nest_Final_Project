package lk.ijse.dreamnest_finalproject.repo;


import lk.ijse.dreamnest_finalproject.entity.Hotel;
import lk.ijse.dreamnest_finalproject.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findByPlaceID(Place place);

    @Query("SELECT h FROM Hotel h WHERE h.placeID.id = :id")
    List<Hotel> findByPlaceIDId(@Param("id") Long id);
}
