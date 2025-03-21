package lk.ijse.dreamnest_finalproject;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DreamNestFinalProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(DreamNestFinalProjectApplication.class, args);
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

}
