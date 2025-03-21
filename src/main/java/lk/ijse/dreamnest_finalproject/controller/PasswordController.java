package lk.ijse.dreamnest_finalproject.controller;


import lk.ijse.dreamnest_finalproject.dto.UserDTO;
import lk.ijse.dreamnest_finalproject.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@RestController
@RequestMapping("/api/v1/password")
@CrossOrigin
public class PasswordController {

    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/sentOTP")
    public String sentOTP(@RequestParam String email){
        try {
           /* boolean exists = userService.ifEmailExists(email);
            if (!exists) {
                return "Email does not exist";
            }*/
            System.out.println("sentOTP");
            int code = (1000 + (int) (Math.random() * 9000));
            sendEmail(email, code);
            return "OTP sent to " + email + " is " + code;
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

        public void sendEmail(String email, int code) {
        new Thread(() -> {
            try {
                String senderEmail = "oshadivimarsha@gmail.com";
                String senderPassword = "yhakbfpunleqsudq"; // Replace with the app-specific password from Gmail

                String subject = "OTP Code from Dream NestHotel Booking System";

                String body = "Dear User,\n\n" +
                        "Your OTP code for accessing Hotel Booking System is: " + code + "\n\n" +
                        "Please use this code to verify your identity. The OTP is valid for 10 minutes only.\n" +
                        "If you did not request this OTP, please ignore this email or contact support.\n\n" +
                        "Best regards,\n" +
                        "The Hotel Dream Nest";

                Properties properties = new Properties();
                properties.put("mail.smtp.auth", "true");
                properties.put("mail.smtp.starttls.enable", "true");
                properties.put("mail.smtp.host", "smtp.gmail.com");
                properties.put("mail.smtp.port", "587");

                // Create a mail session with authentication
                Session session = Session.getInstance(properties, new Authenticator() {
                    @Override
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(senderEmail, senderPassword);
                    }
                });

                try {
                    // Create a MimeMessage object for the email
                    Message message = new MimeMessage(session);
                    message.setFrom(new InternetAddress(senderEmail));
                    message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
                    message.setSubject(subject);
                    message.setText(body);

                    // Send the email
                    Transport.send(message);

                    System.out.println("OTP sent successfully to " + email);
                } catch (MessagingException e) {
                    e.printStackTrace();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();
        }

        @PutMapping("/updatePassword")
        public String updatePassword(@RequestBody UserDTO userDTO){
            try {
                UserDTO exuser = userService.searchUser(userDTO.getEmail());
                exuser.setPassword(userDTO.getPassword());
                System.out.println("updatePassword");
                return "Password updated for "+exuser; // meka gahanna oneee
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }


