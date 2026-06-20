package com.hotelbooking.repository;

import com.hotelbooking.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findByHotelId(Long hotelId, Pageable pageable);
    Page<Review> findByUserId(Long userId, Pageable pageable);
    List<Review> findByHotelId(Long hotelId);

    @Query("SELECT AVG(r.rating) FROM Review r")
    Double calculateOverallAverageRating();

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.hotel.id = :hotelId")
    Double calculateAverageRatingByHotelId(@Param("hotelId") Long hotelId);
}