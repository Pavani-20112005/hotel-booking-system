package com.hotelbooking.service;

import com.hotelbooking.dto.response.AdminDashboardResponse;
import com.hotelbooking.repository.HotelRepository;
import com.hotelbooking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final HotelRepository hotelRepository;
    private final UserRepository userRepository;

    public AdminDashboardResponse getDashboardStats() {
        AdminDashboardResponse response = new AdminDashboardResponse();
        response.setTotalHotels(hotelRepository.count());
        response.setTotalUsers(userRepository.count());
        response.setTotalRooms(0L);
        response.setTotalBookings(0L);
        response.setTotalRevenue(0.0);
        response.setPendingBookings(0L);
        response.setConfirmedBookings(0L);
        response.setCancelledBookings(0L);
        response.setCompletedBookings(0L);
        response.setMonthlyRevenue(0.0);
        response.setMonthlyBookings(0L);
        response.setAverageRating(0.0);
        return response;
    }
}