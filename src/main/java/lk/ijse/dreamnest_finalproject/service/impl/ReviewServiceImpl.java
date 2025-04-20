package lk.ijse.dreamnest_finalproject.service.impl;

import lk.ijse.dreamnest_finalproject.dto.ReviewDTO;
import lk.ijse.dreamnest_finalproject.entity.Review;
import lk.ijse.dreamnest_finalproject.repo.ReviewRepository;
import lk.ijse.dreamnest_finalproject.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public List<ReviewDTO> getAllApprovedReviews() {
        return reviewRepository.findByApprovedTrue().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ReviewDTO> getAllReviews() {
        return reviewRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ReviewDTO getReviewById(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));
        return convertToDTO(review);
    }

    public ReviewDTO createReview(ReviewDTO reviewDTO) {
        Review review = convertToEntity(reviewDTO);
        review.setApproved(false); // By default, reviews require approval
        Review savedReview = reviewRepository.save(review);
        return convertToDTO(savedReview);
    }

    public ReviewDTO updateReview(Long id, ReviewDTO reviewDTO) {
        Review existingReview = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));

        existingReview.setCustomerName(reviewDTO.getCustomerName());
        existingReview.setEmail(reviewDTO.getEmail());
        existingReview.setRating(reviewDTO.getRating());
        existingReview.setComment(reviewDTO.getComment());

        // Allow updates to approval status (for admin)
        if (reviewDTO.getApproved() != null) {
            existingReview.setApproved(reviewDTO.getApproved());
        }

        Review updatedReview = reviewRepository.save(existingReview);
        return convertToDTO(updatedReview);
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }

    public ReviewDTO approveReview(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));

        review.setApproved(true);
        Review savedReview = reviewRepository.save(review);
        return convertToDTO(savedReview);
    }

    public ReviewDTO convertToDTO(Review review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        dto.setCustomerName(review.getCustomerName());
        dto.setEmail(review.getEmail());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setApproved(review.getApproved());
        return dto;
    }

    public Review convertToEntity(ReviewDTO dto) {
        Review review = new Review();
        review.setCustomerName(dto.getCustomerName());
        review.setEmail(dto.getEmail());
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());
        review.setApproved(dto.getApproved() != null ? dto.getApproved() : false);
        return review;
    }

}
