package lk.ijse.dreamnest_finalproject.repo;

import lk.ijse.dreamnest_finalproject.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByApprovedTrue();
    List<Review> findAllByOrderByCreatedAtDesc();
}
