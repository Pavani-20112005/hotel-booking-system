package com.hotelbooking.service;

import com.hotelbooking.dto.request.ReviewRequest;
import com.hotelbooking.dto.response.ReviewResponse;
import com.hotelbooking.entity.Review;
import com.hotelbooking.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewResponse addReview(ReviewRequest request) {
        Review review = new Review();
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setCreatedAt(LocalDateTime.now());
        review.setUpdatedAt(LocalDateTime.now());

        Review saved = reviewRepository.save(review);

        ReviewResponse response = new ReviewResponse();
        response.setId(saved.getId());
        response.setRating(saved.getRating());
        response.setComment(saved.getComment());
        return response;
    }
}