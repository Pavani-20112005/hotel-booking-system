package com.hotelbooking.service;

import com.hotelbooking.dto.request.RoomRequest;
import com.hotelbooking.dto.response.RoomResponse;
import com.hotelbooking.entity.Hotel;
import com.hotelbooking.entity.Room;
import com.hotelbooking.repository.HotelRepository;
import com.hotelbooking.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final HotelRepository hotelRepository;

    public List<RoomResponse> getAllRooms() {
        return roomRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public RoomResponse getRoomById(Long id) {
        return roomRepository.findById(id)
                .map(this::convertToResponse)
                .orElseThrow(() -> new RuntimeException("Room not found"));
    }

    public List<RoomResponse> getRoomsByHotel(Long hotelId) {
        return roomRepository.findByHotelId(hotelId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<RoomResponse> getAvailableRoomsByHotel(Long hotelId) {
        return roomRepository.findByHotelIdAndIsAvailableTrue(hotelId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public RoomResponse createRoom(RoomRequest request) {
        Hotel hotel = hotelRepository.findById(request.getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        Room room = new Room();
        room.setRoomNumber(request.getRoomNumber());
        room.setRoomType(Room.RoomType.valueOf(request.getRoomType().toUpperCase()));
        room.setPricePerNight(request.getPricePerNight());
        room.setIsAvailable(request.getIsAvailable() != null ? request.getIsAvailable() : true);
        room.setHotel(hotel);

        return convertToResponse(roomRepository.save(room));
    }

    public RoomResponse updateRoom(Long id, RoomRequest request) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        room.setRoomNumber(request.getRoomNumber());
        room.setRoomType(Room.RoomType.valueOf(request.getRoomType().toUpperCase()));
        room.setPricePerNight(request.getPricePerNight());
        room.setIsAvailable(request.getIsAvailable());

        return convertToResponse(roomRepository.save(room));
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }

    private RoomResponse convertToResponse(Room room) {
        RoomResponse response = new RoomResponse();
        response.setId(room.getId());
        response.setRoomNumber(room.getRoomNumber());
        response.setRoomType(room.getRoomType().name());
        response.setPricePerNight(room.getPricePerNight());
        response.setIsAvailable(room.getIsAvailable());
        response.setHotelId(room.getHotel().getId());
        response.setHotelName(room.getHotel().getHotelName());
        return response;
    }
}