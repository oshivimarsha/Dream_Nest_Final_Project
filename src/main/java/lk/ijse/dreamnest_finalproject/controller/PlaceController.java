package lk.ijse.dreamnest_finalproject.controller;

import lk.ijse.dreamnest_finalproject.dto.PlaceDTO;
import lk.ijse.dreamnest_finalproject.dto.ResponseDTO;
import lk.ijse.dreamnest_finalproject.service.PlaceService;
import lk.ijse.dreamnest_finalproject.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/place")
@CrossOrigin(origins = "*" , allowedHeaders = "*")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @PostMapping("/save")
    public ResponseEntity<ResponseDTO> savePlaceCategory(@RequestParam("name") String name,
                                                         @RequestParam("description") String description,
                                                         @RequestParam("location") String location,
                                                         @RequestParam("latitude") String latitude,
                                                         @RequestParam("longitude") String longitude,
                                                         @RequestParam("imageFiles") List<MultipartFile> imageFiles) {
        try {
            PlaceDTO place = new PlaceDTO();
            place.setName(name);
            place.setDescription(description);
            place.setLocation(location);
            place.setLatitude(latitude);
            place.setLongitude(longitude);

            List<String> imagePaths = new ArrayList<>();
            if (imageFiles != null && !imageFiles.isEmpty()) {
                for (MultipartFile file : imageFiles) {
                    if (!file.isEmpty()) {
                        String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                        String uploadDir = "uploads/places/";

                        File directory = new File(uploadDir);
                        if (!directory.exists()) {
                            directory.mkdirs();
                        }

                        Path path = Paths.get(uploadDir + filename);
                        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

                        imagePaths.add(uploadDir + filename);
                    }
                }
            }
            place.setImage(imagePaths);

            int res = placeService.savePlace(place);
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
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<ResponseDTO> deletePlace(@RequestParam("placeID") Long placeID) {
        try {
            int res = placeService.deletePlace(placeID);
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
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDTO> updatePlace(@RequestBody PlaceDTO place) {
        try {
            int res = placeService.updatePlace(place);
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
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
                    }
    }

    @GetMapping("/getAll")
    public ResponseEntity<ResponseDTO> getAllPlace() {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDTO(VarList.OK, "Success", placeService.getAllPlace()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }
    }

}
