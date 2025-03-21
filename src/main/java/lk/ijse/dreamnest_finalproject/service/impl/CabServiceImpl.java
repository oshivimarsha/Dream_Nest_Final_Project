package lk.ijse.dreamnest_finalproject.service.impl;

import lk.ijse.dreamnest_finalproject.dto.CabDTO;
import lk.ijse.dreamnest_finalproject.entity.Cab;
import lk.ijse.dreamnest_finalproject.entity.Hotel;
import lk.ijse.dreamnest_finalproject.repo.CabRepository;
import lk.ijse.dreamnest_finalproject.repo.HotelRepository;
import lk.ijse.dreamnest_finalproject.repo.PlaceRepository;
import lk.ijse.dreamnest_finalproject.service.CabService;
import lk.ijse.dreamnest_finalproject.util.VarList;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CabServiceImpl implements CabService {
    @Autowired
    private CabRepository cabRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PlaceRepository placeRepository;

    @Override
    public int saveCab(CabDTO cabDTO) {
        try {
            Cab cab = new Cab(
                    placeRepository.findById(Long.valueOf(cabDTO.getPlaceId())).get(),
                    cabDTO.getName(),
                    cabDTO.getType(),
                    cabDTO.getAvailability_status(),
                    cabDTO.getContact_number(),
                    cabDTO.getLocation(),
                    cabDTO.getLatitude(),
                    cabDTO.getLongitude(),
                    cabDTO.getImage()
            );
            cabRepository.save(cab);
            return VarList.OK;
        } catch (Exception e) {
            e.printStackTrace();
            return VarList.Bad_Gateway;
        }
    }

    @Override
    public int updateCab(CabDTO cabDTO) {
        try {
            cabRepository.save(modelMapper.map(cabDTO, Cab.class));
            return VarList.OK;
        } catch (Exception e) {
            e.printStackTrace();
            return VarList.Bad_Gateway;
        }
    }

    @Override
    public Object getAllCab() {
        try {
            return cabRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public int deleteCab(Long cabId) {
        try {
            cabRepository.deleteById(Long.valueOf(cabId));
            return VarList.OK;
        } catch (Exception e) {
            e.printStackTrace();
            return VarList.Bad_Gateway;
        }
    }
}
