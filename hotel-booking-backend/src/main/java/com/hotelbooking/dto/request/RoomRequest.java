package com.hotelbooking.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomRequest {
    private String roomNumber;
    private String roomType;
    private Double pricePerNight;
    private Long hotelId;
    private Boolean isAvailable;
}