package lk.ijse.dreamnest_finalproject.service;

import lk.ijse.dreamnest_finalproject.dto.ReviewDTO;
import lk.ijse.dreamnest_finalproject.entity.Review;

import java.util.List;

public interface ReviewService {
    List<ReviewDTO> getAllApprovedReviews();

    List<ReviewDTO> getAllReviews();

    ReviewDTO getReviewById(Long id);

    ReviewDTO createReview(ReviewDTO reviewDTO);

    ReviewDTO updateReview(Long id, ReviewDTO reviewDTO);

    void deleteReview(Long id);

    ReviewDTO approveReview(Long id);

    ReviewDTO convertToDTO(Review review);

    Review convertToEntity(ReviewDTO dto);
}
