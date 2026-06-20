package com.hotelbooking.service;

import com.hotelbooking.dto.request.BookingRequest;
import com.hotelbooking.dto.response.BookingResponse;
import com.hotelbooking.entity.Booking;
import com.hotelbooking.entity.Room;
import com.hotelbooking.entity.User;
import com.hotelbooking.repository.BookingRepository;
import com.hotelbooking.repository.RoomRepository;
import com.hotelbooking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    @Transactional
    public BookingResponse createBooking(BookingRequest request) {
        // Get first user (simplified)
        User user = userRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("User not found. Please register first."));

        // Get room
        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found with ID: " + request.getRoomId()));

        // Check availability
        if (!room.getIsAvailable()) {
            throw new RuntimeException("Room is not available.");
        }

        // Calculate total
        long days = ChronoUnit.DAYS.between(request.getCheckInDate(), request.getCheckOutDate());
        if (days <= 0) {
            throw new RuntimeException("Check-out must be after check-in.");
        }
        Double totalAmount = room.getPricePerNight() * days;

        // Create booking
        Booking booking = new Booking();
        booking.setBookingId("BKG-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        booking.setCheckInDate(request.getCheckInDate());
        booking.setCheckOutDate(request.getCheckOutDate());
        booking.setNumberOfGuests(request.getNumberOfGuests());
        booking.setTotalAmount(totalAmount);
        booking.setStatus(Booking.BookingStatus.CONFIRMED);
        booking.setBookingDate(LocalDateTime.now());
        booking.setUser(user);
        booking.setRoom(room);

        // Mark room as unavailable
        room.setIsAvailable(false);
        roomRepository.save(room);

        Booking saved = bookingRepository.save(booking);
        System.out.println("✅ Booking created: " + saved.getBookingId());
        return convertToResponse(saved);
    }

    public BookingResponse getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        return convertToResponse(booking);
    }

    public List<BookingResponse> getUserBookings() {
        return bookingRepository.findByUserId(1L).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public BookingResponse cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus() == Booking.BookingStatus.CANCELLED) {
            throw new RuntimeException("Booking already cancelled");
        }

        booking.setStatus(Booking.BookingStatus.CANCELLED);

        // Make room available again
        Room room = booking.getRoom();
        room.setIsAvailable(true);
        roomRepository.save(room);

        Booking updated = bookingRepository.save(booking);
        return convertToResponse(updated);
    }

    public boolean checkAvailability(Long roomId, java.time.LocalDate checkIn, java.time.LocalDate checkOut) {
        return true;
    }

    private BookingResponse convertToResponse(Booking booking) {
        BookingResponse response = new BookingResponse();
        response.setId(booking.getId());
        response.setBookingId(booking.getBookingId());
        response.setCheckInDate(booking.getCheckInDate());
        response.setCheckOutDate(booking.getCheckOutDate());
        response.setNumberOfGuests(booking.getNumberOfGuests());
        response.setTotalAmount(booking.getTotalAmount());
        response.setStatus(booking.getStatus().name());
        response.setBookingDate(booking.getBookingDate());
        response.setUserId(booking.getUser().getId());
        response.setUserName(booking.getUser().getName());
        response.setRoomId(booking.getRoom().getId());
        response.setRoomNumber(booking.getRoom().getRoomNumber());
        response.setHotelName(booking.getRoom().getHotel().getHotelName());
        response.setCity(booking.getRoom().getHotel().getCity());
        return response;
    }
}