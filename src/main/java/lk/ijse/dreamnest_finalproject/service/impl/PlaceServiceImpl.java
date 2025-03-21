package lk.ijse.dreamnest_finalproject.service.impl;

import lk.ijse.dreamnest_finalproject.dto.PlaceDTO;
import lk.ijse.dreamnest_finalproject.entity.Place;
import lk.ijse.dreamnest_finalproject.repo.PlaceCategoryRepository;
import lk.ijse.dreamnest_finalproject.repo.PlaceRepository;
import lk.ijse.dreamnest_finalproject.service.PlaceService;
import lk.ijse.dreamnest_finalproject.util.VarList;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PlaceServiceImpl implements PlaceService {

    @Autowired
    private PlaceRepository placeRepository;
    @Autowired
    private PlaceCategoryRepository placeCategoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public int savePlace(PlaceDTO place) {
        try {
            // Check if place already exists with the same name and location
           /* Optional<Place> existingPlace = placeRepository.findByNameAndLocation(place.getName(), place.getLocation());
            if (existingPlace.isPresent()) {
                return VarList.Not_Acceptable;
            }*/

            // Map DTO to entity
           /* Place placeEntity = modelMapper.map(place, Place.class);
            placeEntity.setCategory(placeRepository.findBy(place.getCategoryID()).get());*/
            Place placeEntity = new Place(place.getName(), placeCategoryRepository.findById(place.getCategoryID()).get(), place.getDescription(), place.getLocation(), place.getLatitude(), place.getLongitude(), place.getImage());

            // Save the place
            placeRepository.save(placeEntity);
            return VarList.Created;
        } catch (Exception e) {
            e.printStackTrace();
            return VarList.Bad_Gateway;
        }
    }

    @Override
    public int deletePlace(Long placeID) {
        try {
            placeRepository.deleteById(Long.valueOf(placeID));
            return VarList.OK;
        } catch (Exception e) {
            e.printStackTrace();
            return VarList.Bad_Gateway;
        }
    }

    @Override
    public int updatePlace(PlaceDTO place) {
        try {
            placeRepository.save(modelMapper.map(place, Place.class));
            return VarList.OK;
        } catch (Exception e) {
            e.printStackTrace();
            return VarList.Bad_Gateway;
        }
    }

    @Override
    public Object getAllPlace() {
        try {
            return placeRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}