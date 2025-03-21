package lk.ijse.dreamnest_finalproject.service;


import lk.ijse.dreamnest_finalproject.dto.PlaceCategoryDTO;

public interface PlaceCategory {
    int savePlaceCategory(PlaceCategoryDTO placeCt);

    int deletePlaceCategory(String name);

    int updatePlaceCategory(PlaceCategoryDTO placeCt);

    Object getAllPlaceCategory();
}
