package lk.ijse.dreamnest_finalproject.service;


import lk.ijse.dreamnest_finalproject.dto.HotelDTO;

public interface HotelService {
    int saveHotel(HotelDTO hotelDTO);

    int updateHotel(HotelDTO hotel);

    Object getAllHotel();

    int deleteHotel(Long hotelID);
}
