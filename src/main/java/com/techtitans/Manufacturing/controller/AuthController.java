package com.techtitans.Manufacturing.controller;

import com.techtitans.Manufacturing.dto.LoginRequest;
import com.techtitans.Manufacturing.dto.RegisterRequest;
import com.techtitans.Manufacturing.dto.OTPRequest;
import com.techtitans.Manufacturing.dto.ApiResponse;
import com.techtitans.Manufacturing.entity.User;
import com.techtitans.Manufacturing.service.UserService;
import com.techtitans.Manufacturing.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            Optional<User> userOptional = userService.findByEmail(loginRequest.getEmail());
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                String jwt = jwtUtil.generateToken(user.getEmail());

                Map<String, Object> response = new HashMap<>();
                response.put("token", jwt);
                response.put("user", user);

                return ResponseEntity.ok(new ApiResponse(true, "Login successful", response));
            }

            return ResponseEntity.badRequest().body(new ApiResponse(false, "User not found", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid credentials: " + e.getMessage(), null));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            if (userService.findByEmail(registerRequest.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body(new ApiResponse(false, "Email already exists", null));
            }

            User user = new User();
            user.setName(registerRequest.getName());
            user.setEmail(registerRequest.getEmail());
            user.setPassword(registerRequest.getPassword());
            user.setRole(registerRequest.getRole());

            User registeredUser = userService.registerUser(user);

            return ResponseEntity.ok(new ApiResponse(true, "User registered successfully", registeredUser));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Registration failed: " + e.getMessage(), null));
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        boolean result = userService.initiatePasswordReset(email);
        if (result) {
            return ResponseEntity.ok(new ApiResponse(true, "OTP sent to email", null));
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Email not found", null));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody OTPRequest otpRequest) {
        boolean result = userService.resetPassword(otpRequest.getEmail(), otpRequest.getOtp(), otpRequest.getNewPassword());
        if (result) {
            return ResponseEntity.ok(new ApiResponse(true, "Password reset successful", null));
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid OTP or email", null));
        }
    }
}