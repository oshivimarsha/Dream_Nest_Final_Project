package lk.ijse.dreamnest_finalproject.repo;


import lk.ijse.dreamnest_finalproject.entity.PlaceCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceCategoryRepository extends JpaRepository<PlaceCategory, String> {
    boolean existsPlaceCategoriesByName(String name);

    void deleteByName(String name);
}
