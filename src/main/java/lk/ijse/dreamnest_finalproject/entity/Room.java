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
    //@JsonIgnore
    private Hotel hotel;
    @ManyToOne
    private RoomType room_type;
    private String price;
    private String totalRooms;
    private String availableRooms;

  /*  @ElementCollection
    @CollectionTable(name = "room_amenities", joinColumns = @JoinColumn(name = "room_id"))
    private List<String> bookings;*/

    public Room(Hotel hotel, RoomType room_type, String price, String totalRooms, String availableRooms) {
        this.hotel = hotel;
        this.room_type = room_type;
        this.price = price;
        this.totalRooms = totalRooms;
        this.availableRooms = availableRooms;
    }
}
