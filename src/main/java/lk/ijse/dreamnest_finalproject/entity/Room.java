package lk.ijse.dreamnest_finalproject.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Hotel hotel;

    @ManyToOne
    private RoomType room_type;
    private String price;
    private String totalRooms;
    private String availableRooms;

    public Room(Hotel hotel, RoomType room_type, String price, String totalRooms, String availableRooms) {
        this.hotel = hotel;
        this.room_type = room_type;
        this.price = price;
        this.totalRooms = totalRooms;
        this.availableRooms = availableRooms;
    }
}
