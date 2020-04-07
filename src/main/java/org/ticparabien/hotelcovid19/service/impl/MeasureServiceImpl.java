package org.ticparabien.hotelcovid19.service.impl;

import org.ticparabien.hotelcovid19.service.MeasureService;
import org.ticparabien.hotelcovid19.domain.Measure;
import org.ticparabien.hotelcovid19.repository.MeasureRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Measure}.
 */
@Service
@Transactional
public class MeasureServiceImpl implements MeasureService {

    private final Logger log = LoggerFactory.getLogger(MeasureServiceImpl.class);

    private final MeasureRepository measureRepository;

    public MeasureServiceImpl(MeasureRepository measureRepository) {
        this.measureRepository = measureRepository;
    }

    /**
     * Save a measure.
     *
     * @param measure the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Measure save(Measure measure) {
        log.debug("Request to save Measure : {}", measure);
        return measureRepository.save(measure);
    }

    /**
     * Get all the logged user measures.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Measure> findAllByUser(Pageable pageable) {
        log.debug("Request to get all logged user Measures");
        return measureRepository.findByUserIsCurrentUser(pageable);
    }

    /**
     * Get all the measures.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Measure> findAll(Pageable pageable) {
        log.debug("Request to get all Measures");
        return measureRepository.findAll(pageable);
    }


    /**
     * Get one measure by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Measure> findOne(Long id) {
        log.debug("Request to get Measure : {}", id);
        return measureRepository.findById(id);
    }

    /**
     * Delete the measure by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Measure : {}", id);
        measureRepository.deleteById(id);
    }
}
