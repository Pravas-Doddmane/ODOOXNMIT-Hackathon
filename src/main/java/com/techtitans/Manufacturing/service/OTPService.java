package com.techtitans.Manufacturing.service;

import com.techtitans.Manufacturing.entity.User;
import org.springframework.stereotype.Service;
import java.util.Random;

@Service
public class OTPService {

    private static final long OTP_VALID_DURATION = 10 * 60 * 1000; // 10 minutes

    public String generateOTP() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    public boolean validateOTP(User user, String otp) {
        if (user.getOtp() == null || user.getOtpGeneratedTime() == null) {
            return false;
        }

        long currentTime = System.currentTimeMillis();
        long otpRequestedTime = user.getOtpGeneratedTime();

        if (otpRequestedTime + OTP_VALID_DURATION < currentTime) {
            // OTP expired
            return false;
        }

        return user.getOtp().equals(otp);
    }
}