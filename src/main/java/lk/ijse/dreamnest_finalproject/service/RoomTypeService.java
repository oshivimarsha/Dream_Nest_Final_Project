package lk.ijse.dreamnest_finalproject.service;

import lk.ijse.dreamnest_finalproject.dto.HotelDTO;
import lk.ijse.dreamnest_finalproject.dto.RoomDTO;
import lk.ijse.dreamnest_finalproject.dto.RoomTypeDTO;

import java.util.List;

public interface RoomTypeService {
    int saveRoomType(RoomTypeDTO roomTypeDTO);

    int updateRoomType(RoomTypeDTO roomTypeDTO);

    Object getAllRoomType();

    int deleteRoomType(Long id);

}
