package com.hotelbooking.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomResponse {
    private Long id;
    private String roomNumber;
    private String roomType;
    private Double pricePerNight;
    private Boolean isAvailable;
    private Long hotelId;
    private String hotelName;
}