package lk.ijse.dreamnest_finalproject.service;


import lk.ijse.dreamnest_finalproject.dto.HotelDTO;
import lk.ijse.dreamnest_finalproject.entity.Hotel;
import lk.ijse.dreamnest_finalproject.entity.Place;

import java.util.List;

public interface HotelService {
    int saveHotel(HotelDTO hotelDTO);

    int updateHotel(HotelDTO hotel);

    Object getAllHotel();

    int deleteHotel(Long hotelID);

    List<HotelDTO> getHotelsByPlaceId(String placeId);
}
