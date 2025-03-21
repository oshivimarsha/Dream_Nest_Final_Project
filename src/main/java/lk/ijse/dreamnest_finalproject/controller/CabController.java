package lk.ijse.dreamnest_finalproject.controller;

import lk.ijse.dreamnest_finalproject.dto.CabDTO;
import lk.ijse.dreamnest_finalproject.dto.HotelDTO;
import lk.ijse.dreamnest_finalproject.dto.ResponseDTO;
import lk.ijse.dreamnest_finalproject.service.CabService;
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
@RequestMapping("/api/v1/cab")
@CrossOrigin
public class CabController {
    @Autowired
    private CabService cabService;

    @PostMapping("/save")
    public ResponseEntity<ResponseDTO> saveCab(@RequestParam("name") String name,
                                               @RequestParam("placeId") String placeId,
                                               @RequestParam("type") String type,
                                               @RequestParam("availability_status") String availability_status,
                                               @RequestParam("contact_number") String contact_number,
                                               @RequestParam("location") String location,
                                               @RequestParam("latitude") String latitude,
                                               @RequestParam("longitude") String longitude,
                                               @RequestParam("image")List<MultipartFile> imageFiles) {

        try {
            CabDTO cabDTO = new CabDTO();
            cabDTO.setName(name);
            cabDTO.setType(type);
            cabDTO.setAvailability_status(availability_status);
            cabDTO.setContact_number(contact_number);
            cabDTO.setLocation(location);
            cabDTO.setLatitude(latitude);
            cabDTO.setLongitude(longitude);
            cabDTO.setPlaceId(placeId);

            List<String> imagePaths = new ArrayList<>();
            if (imageFiles != null && !imageFiles.isEmpty()) {
                for (MultipartFile file : imageFiles) {
                    if (!file.isEmpty()) {
                        String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                        String uploadDir = "uploads/hotels/";

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
            cabDTO.setImage(imagePaths);

            int res = cabService.saveCab(cabDTO);

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
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDTO> updateCab(@RequestBody CabDTO cabDTO) {
        try {
            int res = cabService.updateCab(cabDTO);
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
    public ResponseEntity<ResponseDTO> getAllCab() {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDTO(VarList.OK, "Success", cabService.getAllCab()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<ResponseDTO> deleteCab(@RequestParam("cabId") Long cabId) {
        try {
            int res = cabService.deleteCab(cabId);
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
}
