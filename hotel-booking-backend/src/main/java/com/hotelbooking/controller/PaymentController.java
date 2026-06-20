package com.hotelbooking.controller;

import com.hotelbooking.dto.request.PaymentRequest;
import com.hotelbooking.dto.response.PaymentResponse;
import com.hotelbooking.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<PaymentResponse> createOrder(@RequestBody PaymentRequest request) {
        return ResponseEntity.ok(paymentService.createOrder(request));
    }

    @PostMapping("/verify/{id}")
    public ResponseEntity<PaymentResponse> verifyPayment(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.verifyPayment(id));
    }
}