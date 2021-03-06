package org.ticparabien.hotelcovid19.repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.ticparabien.hotelcovid19.domain.Measure;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Measure entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MeasureRepository extends JpaRepository<Measure, Long> {

    @Query("select measure from Measure measure where measure.user.login = ?#{principal.username}")
    Page<Measure> findByUserIsCurrentUser(Pageable pageable);

}
