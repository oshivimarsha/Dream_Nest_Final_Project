package lk.ijse.dreamnest_finalproject.service;


import lk.ijse.dreamnest_finalproject.dto.PlaceDTO;

public interface PlaceService {
    int savePlace(PlaceDTO place);

    int deletePlace(Long placeID);

    int updatePlace(PlaceDTO place);

    Object getAllPlace();
}
