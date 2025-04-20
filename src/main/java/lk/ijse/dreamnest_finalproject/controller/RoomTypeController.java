package lk.ijse.dreamnest_finalproject.controller;

import lk.ijse.dreamnest_finalproject.dto.ResponseDTO;
import lk.ijse.dreamnest_finalproject.dto.RoomDTO;
import lk.ijse.dreamnest_finalproject.dto.RoomTypeDTO;
import lk.ijse.dreamnest_finalproject.service.RoomTypeService;
import lk.ijse.dreamnest_finalproject.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/roomType")
@CrossOrigin
public class RoomTypeController {
    @Autowired
    private RoomTypeService roomTypeService;

    @PostMapping("/save")
    public ResponseEntity<ResponseDTO> saveRoomType(@RequestBody RoomTypeDTO roomTypeDTO) {
        try {
            int res = roomTypeService.saveRoomType(roomTypeDTO);

            switch (res) {
                case VarList.Created -> {
                    return ResponseEntity.status(HttpStatus.CREATED)
                            .body(new ResponseDTO(VarList.Created, "Success", null));
                }
                case VarList.Not_Acceptable -> {
                    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
                            .body(new ResponseDTO(VarList.Not_Acceptable, "Place Already Used", null));
                }
                default -> {
                    return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                            .body(new ResponseDTO(VarList.Bad_Gateway, "Error", null));
                }
            }
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDTO> updateRoomType(@RequestBody RoomTypeDTO roomTypeDTO) {
        try {
            int res = roomTypeService.updateRoomType(roomTypeDTO);
            switch (res) {
                case VarList.OK -> {
                    return ResponseEntity.status(HttpStatus.OK)
                            .body(new ResponseDTO(VarList.OK, "Success", null));
                }
                default -> {
                    return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                            .body(new ResponseDTO(VarList.Bad_Gateway, "Error", null));
                }
            }
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseDTO> deleteRoomType(@PathVariable String id) {
        try {
            int res = roomTypeService.deleteRoomType(Long.valueOf(id));
            switch (res) {
                case VarList.OK -> {
                    return ResponseEntity.status(HttpStatus.OK)
                            .body(new ResponseDTO(VarList.OK, "Success", null));
                }
                default -> {
                    return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                            .body(new ResponseDTO(VarList.Bad_Gateway, "Error", null));
                }
            }
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<ResponseDTO> getAllRoomType() {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDTO(VarList.OK, "Success", roomTypeService.getAllRoomType()));
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
}
