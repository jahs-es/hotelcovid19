package org.ticparabien.hotelcovid19.web.rest;

import org.ticparabien.hotelcovid19.Hotelcovid19App;
import org.ticparabien.hotelcovid19.domain.Measure;
import org.ticparabien.hotelcovid19.repository.MeasureRepository;
import org.ticparabien.hotelcovid19.service.MeasureService;
import org.ticparabien.hotelcovid19.service.UserService;
import org.ticparabien.hotelcovid19.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.ticparabien.hotelcovid19.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MeasureResource} REST controller.
 */
@SpringBootTest(classes = Hotelcovid19App.class)
public class MeasureResourceIT {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Double DEFAULT_TEMPERATURE_AT_8 = 1D;
    private static final Double UPDATED_TEMPERATURE_AT_8 = 2D;

    private static final Double DEFAULT_TEMPERATURE_AT_20 = 1D;
    private static final Double UPDATED_TEMPERATURE_AT_20 = 2D;

    private static final Boolean DEFAULT_COUGHT = false;
    private static final Boolean UPDATED_COUGHT = true;

    private static final Boolean DEFAULT_TROUBLE_TO_BREATHE = false;
    private static final Boolean UPDATED_TROUBLE_TO_BREATHE = true;

    private static final Boolean DEFAULT_SPUTUM = false;
    private static final Boolean UPDATED_SPUTUM = true;

    private static final Boolean DEFAULT_SORE_THROAT = false;
    private static final Boolean UPDATED_SORE_THROAT = true;

    private static final Boolean DEFAULT_OST_TASTE = false;
    private static final Boolean UPDATED_OST_TASTE = true;

    private static final Boolean DEFAULT_FLUTTER = false;
    private static final Boolean UPDATED_FLUTTER = true;

    private static final Boolean DEFAULT_DIARRHEA = false;
    private static final Boolean UPDATED_DIARRHEA = true;

    private static final Boolean DEFAULT_HEADACHE = false;
    private static final Boolean UPDATED_HEADACHE = true;

    private static final Boolean DEFAULT_MUSCLE_PAIN = false;
    private static final Boolean UPDATED_MUSCLE_PAIN = true;

    private static final String DEFAULT_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_NOTES = "BBBBBBBBBB";

    @Autowired
    private MeasureRepository measureRepository;

    @Autowired
    private MeasureService measureService;

    @Autowired
    private UserService userService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restMeasureMockMvc;

    private Measure measure;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MeasureResource measureResource = new MeasureResource(measureService, userService);
        this.restMeasureMockMvc = MockMvcBuilders.standaloneSetup(measureResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Measure createEntity(EntityManager em) {
        Measure measure = new Measure()
            .date(DEFAULT_DATE)
            .temperatureAt8(DEFAULT_TEMPERATURE_AT_8)
            .temperatureAt20(DEFAULT_TEMPERATURE_AT_20)
            .cought(DEFAULT_COUGHT)
            .troubleToBreathe(DEFAULT_TROUBLE_TO_BREATHE)
            .sputum(DEFAULT_SPUTUM)
            .soreThroat(DEFAULT_SORE_THROAT)
            .ostTaste(DEFAULT_OST_TASTE)
            .flutter(DEFAULT_FLUTTER)
            .diarrhea(DEFAULT_DIARRHEA)
            .headache(DEFAULT_HEADACHE)
            .musclePain(DEFAULT_MUSCLE_PAIN)
            .notes(DEFAULT_NOTES);
        return measure;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Measure createUpdatedEntity(EntityManager em) {
        Measure measure = new Measure()
            .date(UPDATED_DATE)
            .temperatureAt8(UPDATED_TEMPERATURE_AT_8)
            .temperatureAt20(UPDATED_TEMPERATURE_AT_20)
            .cought(UPDATED_COUGHT)
            .troubleToBreathe(UPDATED_TROUBLE_TO_BREATHE)
            .sputum(UPDATED_SPUTUM)
            .soreThroat(UPDATED_SORE_THROAT)
            .ostTaste(UPDATED_OST_TASTE)
            .flutter(UPDATED_FLUTTER)
            .diarrhea(UPDATED_DIARRHEA)
            .headache(UPDATED_HEADACHE)
            .musclePain(UPDATED_MUSCLE_PAIN)
            .notes(UPDATED_NOTES);
        return measure;
    }

    @BeforeEach
    public void initTest() {
        measure = createEntity(em);
    }

    @Test
    @Transactional
    public void createMeasure() throws Exception {
        int databaseSizeBeforeCreate = measureRepository.findAll().size();

        // Create the Measure
        restMeasureMockMvc.perform(post("/api/measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(measure)))
            .andExpect(status().isCreated());

        // Validate the Measure in the database
        List<Measure> measureList = measureRepository.findAll();
        assertThat(measureList).hasSize(databaseSizeBeforeCreate + 1);
        Measure testMeasure = measureList.get(measureList.size() - 1);
        assertThat(testMeasure.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testMeasure.getTemperatureAt8()).isEqualTo(DEFAULT_TEMPERATURE_AT_8);
        assertThat(testMeasure.getTemperatureAt20()).isEqualTo(DEFAULT_TEMPERATURE_AT_20);
        assertThat(testMeasure.isCought()).isEqualTo(DEFAULT_COUGHT);
        assertThat(testMeasure.isTroubleToBreathe()).isEqualTo(DEFAULT_TROUBLE_TO_BREATHE);
        assertThat(testMeasure.isSputum()).isEqualTo(DEFAULT_SPUTUM);
        assertThat(testMeasure.isSoreThroat()).isEqualTo(DEFAULT_SORE_THROAT);
        assertThat(testMeasure.isOstTaste()).isEqualTo(DEFAULT_OST_TASTE);
        assertThat(testMeasure.isFlutter()).isEqualTo(DEFAULT_FLUTTER);
        assertThat(testMeasure.isDiarrhea()).isEqualTo(DEFAULT_DIARRHEA);
        assertThat(testMeasure.isHeadache()).isEqualTo(DEFAULT_HEADACHE);
        assertThat(testMeasure.isMusclePain()).isEqualTo(DEFAULT_MUSCLE_PAIN);
        assertThat(testMeasure.getNotes()).isEqualTo(DEFAULT_NOTES);
    }

    @Test
    @Transactional
    public void createMeasureWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = measureRepository.findAll().size();

        // Create the Measure with an existing ID
        measure.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMeasureMockMvc.perform(post("/api/measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(measure)))
            .andExpect(status().isBadRequest());

        // Validate the Measure in the database
        List<Measure> measureList = measureRepository.findAll();
        assertThat(measureList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = measureRepository.findAll().size();
        // set the field null
        measure.setDate(null);

        // Create the Measure, which fails.

        restMeasureMockMvc.perform(post("/api/measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(measure)))
            .andExpect(status().isBadRequest());

        List<Measure> measureList = measureRepository.findAll();
        assertThat(measureList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCoughtIsRequired() throws Exception {
        int databaseSizeBeforeTest = measureRepository.findAll().size();
        // set the field null
        measure.setCought(null);

        // Create the Measure, which fails.

        restMeasureMockMvc.perform(post("/api/measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(measure)))
            .andExpect(status().isBadRequest());

        List<Measure> measureList = measureRepository.findAll();
        assertThat(measureList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTroubleToBreatheIsRequired() throws Exception {
        int databaseSizeBeforeTest = measureRepository.findAll().size();
        // set the field null
        measure.setTroubleToBreathe(null);

        // Create the Measure, which fails.

        restMeasureMockMvc.perform(post("/api/measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(measure)))
            .andExpect(status().isBadRequest());

        List<Measure> measureList = measureRepository.findAll();
        assertThat(measureList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSputumIsRequired() throws Exception {
        int databaseSizeBeforeTest = measureRepository.findAll().size();
        // set the field null
        measure.setSputum(null);

        // Create the Measure, which fails.

        restMeasureMockMvc.perform(post("/api/measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(measure)))
            .andExpect(status().isBadRequest());

        List<Measure> measureList = measureRepository.findAll();
        assertThat(measureList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSoreThroatIsRequired() throws Exception {
        int databaseSizeBeforeTest = measureRepository.findAll().size();
        // set the field null
        measure.setSoreThroat(null);

        // Create the Measure, which fails.

        restMeasureMockMvc.perform(post("/api/measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(measure)))
            .andExpect(status().isBadRequest());

        List<Measure> measureList = measureRepository.findAll();
        assertThat(measureList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOstTasteIsRequired() throws Exception {
        int databaseSizeBeforeTest = measureRepository.findAll().size();
        // set the field null
        measure.setOstTaste(null);

        // Create the Measure, which fails.

        restMeasureMockMvc.perform(post("/api/measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(measure)))
            .andExpect(status().isBadRequest());

        List<Measure> measureList = measureRepository.findAll();
        assertThat(measureList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFlutterIsRequired() throws Exception {
        int databaseSizeBeforeTest = measureRepository.findAll().size();
        // set the field null
        measure.setFlutter(null);

        // Create the Measure, which fails.

        restMeasureMockMvc.perform(post("/api/measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(measure)))
            .andExpect(status().isBadRequest());

        List<Measure> measureList = measureRepository.findAll();
        assertThat(measureList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDiarrheaIsRequired() throws Exception {
        int databaseSizeBeforeTest = measureRepository.findAll().size();
        // set the field null
        measure.setDiarrhea(null);

        // Create the Measure, which fails.

        restMeasureMockMvc.perform(post("/api/measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(measure)))
            .andExpect(status().isBadRequest());

        List<Measure> measureList = measureRepository.findAll();
        assertThat(measureList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHeadacheIsRequired() throws Exception {
        int databaseSizeBeforeTest = measureRepository.findAll().size();
        // set the field null
        measure.setHeadache(null);

        // Create the Measure, which fails.

        restMeasureMockMvc.perform(post("/api/measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(measure)))
            .andExpect(status().isBadRequest());

        List<Measure> measureList = measureRepository.findAll();
        assertThat(measureList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMusclePainIsRequired() throws Exception {
        int databaseSizeBeforeTest = measureRepository.findAll().size();
        // set the field null
        measure.setMusclePain(null);

        // Create the Measure, which fails.

        restMeasureMockMvc.perform(post("/api/measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(measure)))
            .andExpect(status().isBadRequest());

        List<Measure> measureList = measureRepository.findAll();
        assertThat(measureList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMeasures() throws Exception {
        // Initialize the database
        measureRepository.saveAndFlush(measure);

        // Get all the measureList
        restMeasureMockMvc.perform(get("/api/measures?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(measure.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].temperatureAt8").value(hasItem(DEFAULT_TEMPERATURE_AT_8.doubleValue())))
            .andExpect(jsonPath("$.[*].temperatureAt20").value(hasItem(DEFAULT_TEMPERATURE_AT_20.doubleValue())))
            .andExpect(jsonPath("$.[*].cought").value(hasItem(DEFAULT_COUGHT.booleanValue())))
            .andExpect(jsonPath("$.[*].troubleToBreathe").value(hasItem(DEFAULT_TROUBLE_TO_BREATHE.booleanValue())))
            .andExpect(jsonPath("$.[*].sputum").value(hasItem(DEFAULT_SPUTUM.booleanValue())))
            .andExpect(jsonPath("$.[*].soreThroat").value(hasItem(DEFAULT_SORE_THROAT.booleanValue())))
            .andExpect(jsonPath("$.[*].ostTaste").value(hasItem(DEFAULT_OST_TASTE.booleanValue())))
            .andExpect(jsonPath("$.[*].flutter").value(hasItem(DEFAULT_FLUTTER.booleanValue())))
            .andExpect(jsonPath("$.[*].diarrhea").value(hasItem(DEFAULT_DIARRHEA.booleanValue())))
            .andExpect(jsonPath("$.[*].headache").value(hasItem(DEFAULT_HEADACHE.booleanValue())))
            .andExpect(jsonPath("$.[*].musclePain").value(hasItem(DEFAULT_MUSCLE_PAIN.booleanValue())))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES)));
    }

    @Test
    @Transactional
    public void getMeasure() throws Exception {
        // Initialize the database
        measureRepository.saveAndFlush(measure);

        // Get the measure
        restMeasureMockMvc.perform(get("/api/measures/{id}", measure.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(measure.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.temperatureAt8").value(DEFAULT_TEMPERATURE_AT_8.doubleValue()))
            .andExpect(jsonPath("$.temperatureAt20").value(DEFAULT_TEMPERATURE_AT_20.doubleValue()))
            .andExpect(jsonPath("$.cought").value(DEFAULT_COUGHT.booleanValue()))
            .andExpect(jsonPath("$.troubleToBreathe").value(DEFAULT_TROUBLE_TO_BREATHE.booleanValue()))
            .andExpect(jsonPath("$.sputum").value(DEFAULT_SPUTUM.booleanValue()))
            .andExpect(jsonPath("$.soreThroat").value(DEFAULT_SORE_THROAT.booleanValue()))
            .andExpect(jsonPath("$.ostTaste").value(DEFAULT_OST_TASTE.booleanValue()))
            .andExpect(jsonPath("$.flutter").value(DEFAULT_FLUTTER.booleanValue()))
            .andExpect(jsonPath("$.diarrhea").value(DEFAULT_DIARRHEA.booleanValue()))
            .andExpect(jsonPath("$.headache").value(DEFAULT_HEADACHE.booleanValue()))
            .andExpect(jsonPath("$.musclePain").value(DEFAULT_MUSCLE_PAIN.booleanValue()))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES));
    }

    @Test
    @Transactional
    public void getNonExistingMeasure() throws Exception {
        // Get the measure
        restMeasureMockMvc.perform(get("/api/measures/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMeasure() throws Exception {
        // Initialize the database
        measureService.save(measure);

        int databaseSizeBeforeUpdate = measureRepository.findAll().size();

        // Update the measure
        Measure updatedMeasure = measureRepository.findById(measure.getId()).get();
        // Disconnect from session so that the updates on updatedMeasure are not directly saved in db
        em.detach(updatedMeasure);
        updatedMeasure
            .date(UPDATED_DATE)
            .temperatureAt8(UPDATED_TEMPERATURE_AT_8)
            .temperatureAt20(UPDATED_TEMPERATURE_AT_20)
            .cought(UPDATED_COUGHT)
            .troubleToBreathe(UPDATED_TROUBLE_TO_BREATHE)
            .sputum(UPDATED_SPUTUM)
            .soreThroat(UPDATED_SORE_THROAT)
            .ostTaste(UPDATED_OST_TASTE)
            .flutter(UPDATED_FLUTTER)
            .diarrhea(UPDATED_DIARRHEA)
            .headache(UPDATED_HEADACHE)
            .musclePain(UPDATED_MUSCLE_PAIN)
            .notes(UPDATED_NOTES);

        restMeasureMockMvc.perform(put("/api/measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMeasure)))
            .andExpect(status().isOk());

        // Validate the Measure in the database
        List<Measure> measureList = measureRepository.findAll();
        assertThat(measureList).hasSize(databaseSizeBeforeUpdate);
        Measure testMeasure = measureList.get(measureList.size() - 1);
        assertThat(testMeasure.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testMeasure.getTemperatureAt8()).isEqualTo(UPDATED_TEMPERATURE_AT_8);
        assertThat(testMeasure.getTemperatureAt20()).isEqualTo(UPDATED_TEMPERATURE_AT_20);
        assertThat(testMeasure.isCought()).isEqualTo(UPDATED_COUGHT);
        assertThat(testMeasure.isTroubleToBreathe()).isEqualTo(UPDATED_TROUBLE_TO_BREATHE);
        assertThat(testMeasure.isSputum()).isEqualTo(UPDATED_SPUTUM);
        assertThat(testMeasure.isSoreThroat()).isEqualTo(UPDATED_SORE_THROAT);
        assertThat(testMeasure.isOstTaste()).isEqualTo(UPDATED_OST_TASTE);
        assertThat(testMeasure.isFlutter()).isEqualTo(UPDATED_FLUTTER);
        assertThat(testMeasure.isDiarrhea()).isEqualTo(UPDATED_DIARRHEA);
        assertThat(testMeasure.isHeadache()).isEqualTo(UPDATED_HEADACHE);
        assertThat(testMeasure.isMusclePain()).isEqualTo(UPDATED_MUSCLE_PAIN);
        assertThat(testMeasure.getNotes()).isEqualTo(UPDATED_NOTES);
    }

    @Test
    @Transactional
    public void updateNonExistingMeasure() throws Exception {
        int databaseSizeBeforeUpdate = measureRepository.findAll().size();

        // Create the Measure

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMeasureMockMvc.perform(put("/api/measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(measure)))
            .andExpect(status().isBadRequest());

        // Validate the Measure in the database
        List<Measure> measureList = measureRepository.findAll();
        assertThat(measureList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMeasure() throws Exception {
        // Initialize the database
        measureService.save(measure);

        int databaseSizeBeforeDelete = measureRepository.findAll().size();

        // Delete the measure
        restMeasureMockMvc.perform(delete("/api/measures/{id}", measure.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Measure> measureList = measureRepository.findAll();
        assertThat(measureList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Measure.class);
        Measure measure1 = new Measure();
        measure1.setId(1L);
        Measure measure2 = new Measure();
        measure2.setId(measure1.getId());
        assertThat(measure1).isEqualTo(measure2);
        measure2.setId(2L);
        assertThat(measure1).isNotEqualTo(measure2);
        measure1.setId(null);
        assertThat(measure1).isNotEqualTo(measure2);
    }
}
