package com.techtitans.Manufacturing.dto;

import lombok.Data;

@Data
public class OTPRequest {
    private String email;
    private String otp;
    private String newPassword;
}