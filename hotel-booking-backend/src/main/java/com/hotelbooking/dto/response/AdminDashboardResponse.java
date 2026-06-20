package com.hotelbooking.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardResponse {
    private Long totalHotels;
    private Long totalUsers;
    private Long totalRooms;
    private Long totalBookings;
    private Double totalRevenue;
    private Long pendingBookings;
    private Long confirmedBookings;
    private Long cancelledBookings;
    private Long completedBookings;
    private Double monthlyRevenue;
    private Long monthlyBookings;
    private Double averageRating;
}