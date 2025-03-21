package lk.ijse.dreamnest_finalproject.service.impl;

import lk.ijse.dreamnest_finalproject.dto.RoomTypeDTO;
import lk.ijse.dreamnest_finalproject.entity.RoomType;
import lk.ijse.dreamnest_finalproject.repo.RoomTypeRepository;
import lk.ijse.dreamnest_finalproject.service.RoomTypeService;
import lk.ijse.dreamnest_finalproject.util.VarList;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RoomTypeServiceIMPL implements RoomTypeService {
    @Autowired
    private RoomTypeRepository roomTypeRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public int saveRoomType(RoomTypeDTO roomTypeDTO) {
        try{
            if (roomTypeRepository.existsById(roomTypeDTO.getId())) {
                return VarList.Bad_Gateway;
            }
            roomTypeRepository.save(modelMapper.map(roomTypeDTO, RoomType.class));
            return VarList.OK;
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public int updateRoomType(RoomTypeDTO roomTypeDTO) {
        if (roomTypeRepository.existsById(roomTypeDTO.getId())) {
            roomTypeRepository.save(modelMapper.map(roomTypeDTO, RoomType.class));
            return VarList.OK;
        }else {
            return VarList.Bad_Gateway;
        }
    }

    @Override
    public Object getAllRoomType() {
        try {
            return roomTypeRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public int deleteRoomType(Long id) {
        if (roomTypeRepository.existsById(id)) {
            roomTypeRepository.deleteById(id);
            return VarList.OK;
        }else {
            return VarList.Bad_Gateway;
        }
    }
}
