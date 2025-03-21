package lk.ijse.dreamnest_finalproject.controller;

import lk.ijse.dreamnest_finalproject.dto.PlaceCategoryDTO;
import lk.ijse.dreamnest_finalproject.dto.ResponseDTO;
import lk.ijse.dreamnest_finalproject.service.PlaceCategory;
import lk.ijse.dreamnest_finalproject.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/placeCategory")
@CrossOrigin
@Transactional
public class PlaceCategoryController {
    @Autowired
    private PlaceCategory placeCategory;
    @PostMapping("/save")
    public ResponseEntity<ResponseDTO> savePlaceCategory(@RequestBody PlaceCategoryDTO placeCt) {
        try {
            int res = placeCategory.savePlaceCategory(placeCt);
            switch (res) {
                case VarList.Created -> {
                    return ResponseEntity.status(HttpStatus.CREATED)
                            .body(new ResponseDTO(VarList.Created, "Success", null));
                }
                case VarList.Not_Acceptable -> {
                    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
                            .body(new ResponseDTO(VarList.Not_Acceptable, "Email Already Used", null));
                }
                default -> {
                    return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                            .body(new ResponseDTO(VarList.Bad_Gateway, "Error", null));
                }
            }
        }catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/delete/{name}")
    public ResponseEntity<ResponseDTO> deletePlaceCategory(@PathVariable String name) {
        System.out.println(name + "delete");
        try {
           int res = placeCategory.deletePlaceCategory(name);
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
        }catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

   @PutMapping("/update")
    public ResponseEntity<ResponseDTO> updatePlaceCategory(@RequestBody PlaceCategoryDTO placeCt) {
           System.out.println();
        try {
            int res = placeCategory.updatePlaceCategory(placeCt);
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
        }catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<ResponseDTO> getAllPlaceCategory() {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDTO(VarList.OK, "Success", placeCategory.getAllPlaceCategory()));
        }catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
