    package lk.ijse.dreamnest_finalproject.dto;

    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public class RoomDTO {
        private Long id;
        private long HotelId;
        private Long room_type;
        private String price;
        private String totalRooms;
        private String availableRooms;
    }
