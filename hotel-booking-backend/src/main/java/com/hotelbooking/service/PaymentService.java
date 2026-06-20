package com.hotelbooking.service;

import com.hotelbooking.dto.request.PaymentRequest;
import com.hotelbooking.dto.response.PaymentResponse;
import com.hotelbooking.entity.Payment;
import com.hotelbooking.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentResponse createOrder(PaymentRequest request) {
        Payment payment = new Payment();
        payment.setOrderId("ORDER_" + UUID.randomUUID().toString().substring(0, 8));
        payment.setAmount(request.getAmount());
        payment.setStatus(Payment.PaymentStatus.PENDING);
        payment.setPaymentDate(LocalDateTime.now());

        Payment saved = paymentRepository.save(payment);

        PaymentResponse response = new PaymentResponse();
        response.setId(saved.getId());
        response.setOrderId(saved.getOrderId());
        response.setAmount(saved.getAmount());
        response.setStatus(saved.getStatus().name());
        return response;
    }

    public PaymentResponse verifyPayment(Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        payment.setStatus(Payment.PaymentStatus.COMPLETED);
        Payment saved = paymentRepository.save(payment);

        PaymentResponse response = new PaymentResponse();
        response.setId(saved.getId());
        response.setStatus(saved.getStatus().name());
        return response;
    }
}