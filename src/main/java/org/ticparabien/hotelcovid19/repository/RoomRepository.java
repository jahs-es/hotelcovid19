package org.ticparabien.hotelcovid19.repository;
import org.ticparabien.hotelcovid19.domain.Room;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.ticparabien.hotelcovid19.domain.User;

import java.util.Optional;


/**
 * Spring Data  repository for the Room entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    Optional<Room> findOneByUserId(Long userId);
}
