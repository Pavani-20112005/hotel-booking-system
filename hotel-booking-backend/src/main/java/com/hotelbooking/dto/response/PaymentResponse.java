package com.hotelbooking.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponse {
    private Long id;
    private String paymentId;
    private String orderId;
    private Double amount;
    private String status;
    private LocalDateTime paymentDate;
    private Long bookingId;
    private String bookingIdNumber;  // ← THIS FIELD IS USED
}