package lk.ijse.dreamnest_finalproject.controller;


import jakarta.validation.Valid;
import lk.ijse.dreamnest_finalproject.dto.AuthDTO;
import lk.ijse.dreamnest_finalproject.dto.HotelDTO;
import lk.ijse.dreamnest_finalproject.dto.ResponseDTO;
import lk.ijse.dreamnest_finalproject.dto.UserDTO;
import lk.ijse.dreamnest_finalproject.service.HotelService;
import lk.ijse.dreamnest_finalproject.util.JwtUtil;
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
@RequestMapping("/api/v1/hotel")
@CrossOrigin
public class HotelController {
    @Autowired
    private HotelService hotelService;

    private JwtUtil jwtUtil;

    @PostMapping(value = "/register")
    public ResponseEntity<ResponseDTO> registerUser(@RequestBody @Valid HotelDTO hotelDTO) {
        System.out.println("hotel register");
        try {
            int res = hotelService.saveHotel(hotelDTO);
            switch (res) {
                case VarList.Created -> {
                    String token = jwtUtil.generateToken(hotelDTO);
                    AuthDTO authDTO = new AuthDTO();
                    authDTO.setEmail(hotelDTO.getName());
                    authDTO.setToken(token);
                    return ResponseEntity.status(HttpStatus.CREATED)
                            .body(new ResponseDTO(VarList.Created, "Success", authDTO));
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
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }
    }

    @PostMapping("/save")
    public ResponseEntity<ResponseDTO> saveHotel(@RequestParam("name") String name,
                                                 @RequestParam("email") String email,
                                                 @RequestParam("placeID") String placeID,
                                                 @RequestParam("description") String description,
                                                 @RequestParam("location") String location,
                                                 @RequestParam("latitude") String latitude,
                                                 @RequestParam("longitude") String longitude,
                                                 @RequestParam("imageFiles") List<MultipartFile> imageFiles) {

        try {
            HotelDTO hotelDTO = new HotelDTO();
            hotelDTO.setName(name);
            hotelDTO.setEmail(email);
            hotelDTO.setDescription(description);
            hotelDTO.setLocation(location);
            hotelDTO.setLatitude(latitude);
            hotelDTO.setLongitude(longitude);
            hotelDTO.setPlaceID(placeID);

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
            hotelDTO.setImage(imagePaths);

            int res = hotelService.saveHotel(hotelDTO);

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
    public ResponseEntity<ResponseDTO> updateHotel(@RequestBody HotelDTO hotel) {
        try {
            int res = hotelService.updateHotel(hotel);
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
    public ResponseEntity<ResponseDTO> getAllHotel() {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDTO(VarList.OK, "Success", hotelService.getAllHotel()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }
    }
    @DeleteMapping("/delete")
    public ResponseEntity<ResponseDTO> deleteHotel(@RequestParam("hotelID") Long hotelID) {
        try {
            int res = hotelService.deleteHotel(hotelID);
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


