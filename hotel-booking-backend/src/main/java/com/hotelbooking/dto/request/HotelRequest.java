package com.hotelbooking.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HotelRequest {
    private String hotelName;
    private String city;
    private String address;
    private String description;
    private Double rating;
    private List<String> imageUrls;
}