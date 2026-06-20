package com.hotelbooking.controller;

import com.hotelbooking.dto.response.AdminDashboardResponse;
import com.hotelbooking.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AdminController {

        private final AdminService adminService;

        @GetMapping("/dashboard")
        public ResponseEntity<AdminDashboardResponse> getDashboard() {
                return ResponseEntity.ok(adminService.getDashboardStats());
        }
}