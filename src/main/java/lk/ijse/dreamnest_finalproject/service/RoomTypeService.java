package lk.ijse.dreamnest_finalproject.service;

import lk.ijse.dreamnest_finalproject.dto.RoomTypeDTO;

public interface RoomTypeService {
    int saveRoomType(RoomTypeDTO roomTypeDTO);

    int updateRoomType(RoomTypeDTO roomTypeDTO);

    Object getAllRoomType();

    int deleteRoomType(Long id);
}
