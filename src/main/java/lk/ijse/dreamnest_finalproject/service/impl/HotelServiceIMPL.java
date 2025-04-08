package lk.ijse.dreamnest_finalproject.service.impl;

import lk.ijse.dreamnest_finalproject.dto.HotelDTO;
import lk.ijse.dreamnest_finalproject.entity.Hotel;
import lk.ijse.dreamnest_finalproject.repo.HotelRepository;
import lk.ijse.dreamnest_finalproject.repo.PlaceRepository;
import lk.ijse.dreamnest_finalproject.service.HotelService;
import lk.ijse.dreamnest_finalproject.util.VarList;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HotelServiceIMPL implements HotelService {
    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PlaceRepository placeRepository;

    @Override
    public int saveHotel(HotelDTO hotelDTO) {
        try {
            Hotel hotel = new Hotel(
                    placeRepository.findById((Long.valueOf(hotelDTO.getPlaceID()))).get(),
                    hotelDTO.getName(),
                    hotelDTO.getEmail(),
                    hotelDTO.getDescription(),
                    hotelDTO.getLocation(),
                    hotelDTO.getLatitude(),
                    hotelDTO.getLongitude(),
                    hotelDTO.getImage()
            );
            hotelRepository.save(hotel);
            return VarList.OK;
        } catch (Exception e) {
            e.printStackTrace();
            return VarList.Bad_Gateway;
        }
    }

    @Override
    public int updateHotel(HotelDTO hotel) {
        try {
            hotelRepository.save(modelMapper.map(hotel, Hotel.class));
            return VarList.OK;
        } catch (Exception e) {
            e.printStackTrace();
            return VarList.Bad_Gateway;
        }
    }

    @Override
    public Object getAllHotel() {
        try {
            return hotelRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public int deleteHotel(Long hotelID) {
        try {
            hotelRepository.deleteById(Long.valueOf(hotelID));
            return VarList.OK;
        } catch (Exception e) {
            e.printStackTrace();
            return VarList.Bad_Gateway;
        }
    }

}
