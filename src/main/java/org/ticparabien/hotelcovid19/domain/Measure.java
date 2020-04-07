package org.ticparabien.hotelcovid19.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Measure.
 */
@Entity
@Table(name = "measure")
public class Measure implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "date", nullable = false)
    private Instant date;

    @Column(name = "temperature_at_8")
    private Double temperatureAt8;

    @Column(name = "temperature_at_20")
    private Double temperatureAt20;

    @NotNull
    @Column(name = "cought", nullable = false)
    private Boolean cought;

    @NotNull
    @Column(name = "trouble_to_breathe", nullable = false)
    private Boolean troubleToBreathe;

    @NotNull
    @Column(name = "sputum", nullable = false)
    private Boolean sputum;

    @NotNull
    @Column(name = "sore_throat", nullable = false)
    private Boolean soreThroat;

    @NotNull
    @Column(name = "ost_taste", nullable = false)
    private Boolean ostTaste;

    @NotNull
    @Column(name = "flutter", nullable = false)
    private Boolean flutter;

    @NotNull
    @Column(name = "diarrhea", nullable = false)
    private Boolean diarrhea;

    @NotNull
    @Column(name = "headache", nullable = false)
    private Boolean headache;

    @NotNull
    @Column(name = "muscle_pain", nullable = false)
    private Boolean musclePain;

    @Column(name = "notes")
    private String notes;

    @ManyToOne
    @JsonIgnoreProperties("measures")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public Measure date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Double getTemperatureAt8() {
        return temperatureAt8;
    }

    public Measure temperatureAt8(Double temperatureAt8) {
        this.temperatureAt8 = temperatureAt8;
        return this;
    }

    public void setTemperatureAt8(Double temperatureAt8) {
        this.temperatureAt8 = temperatureAt8;
    }

    public Double getTemperatureAt20() {
        return temperatureAt20;
    }

    public Measure temperatureAt20(Double temperatureAt20) {
        this.temperatureAt20 = temperatureAt20;
        return this;
    }

    public void setTemperatureAt20(Double temperatureAt20) {
        this.temperatureAt20 = temperatureAt20;
    }

    public Boolean isCought() {
        return cought;
    }

    public Measure cought(Boolean cought) {
        this.cought = cought;
        return this;
    }

    public void setCought(Boolean cought) {
        this.cought = cought;
    }

    public Boolean isTroubleToBreathe() {
        return troubleToBreathe;
    }

    public Measure troubleToBreathe(Boolean troubleToBreathe) {
        this.troubleToBreathe = troubleToBreathe;
        return this;
    }

    public void setTroubleToBreathe(Boolean troubleToBreathe) {
        this.troubleToBreathe = troubleToBreathe;
    }

    public Boolean isSputum() {
        return sputum;
    }

    public Measure sputum(Boolean sputum) {
        this.sputum = sputum;
        return this;
    }

    public void setSputum(Boolean sputum) {
        this.sputum = sputum;
    }

    public Boolean isSoreThroat() {
        return soreThroat;
    }

    public Measure soreThroat(Boolean soreThroat) {
        this.soreThroat = soreThroat;
        return this;
    }

    public void setSoreThroat(Boolean soreThroat) {
        this.soreThroat = soreThroat;
    }

    public Boolean isOstTaste() {
        return ostTaste;
    }

    public Measure ostTaste(Boolean ostTaste) {
        this.ostTaste = ostTaste;
        return this;
    }

    public void setOstTaste(Boolean ostTaste) {
        this.ostTaste = ostTaste;
    }

    public Boolean isFlutter() {
        return flutter;
    }

    public Measure flutter(Boolean flutter) {
        this.flutter = flutter;
        return this;
    }

    public void setFlutter(Boolean flutter) {
        this.flutter = flutter;
    }

    public Boolean isDiarrhea() {
        return diarrhea;
    }

    public Measure diarrhea(Boolean diarrhea) {
        this.diarrhea = diarrhea;
        return this;
    }

    public void setDiarrhea(Boolean diarrhea) {
        this.diarrhea = diarrhea;
    }

    public Boolean isHeadache() {
        return headache;
    }

    public Measure headache(Boolean headache) {
        this.headache = headache;
        return this;
    }

    public void setHeadache(Boolean headache) {
        this.headache = headache;
    }

    public Boolean isMusclePain() {
        return musclePain;
    }

    public Measure musclePain(Boolean musclePain) {
        this.musclePain = musclePain;
        return this;
    }

    public void setMusclePain(Boolean musclePain) {
        this.musclePain = musclePain;
    }

    public String getNotes() {
        return notes;
    }

    public Measure notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public User getUser() {
        return user;
    }

    public Measure user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Measure)) {
            return false;
        }
        return id != null && id.equals(((Measure) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Measure{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", temperatureAt8=" + getTemperatureAt8() +
            ", temperatureAt20=" + getTemperatureAt20() +
            ", cought='" + isCought() + "'" +
            ", troubleToBreathe='" + isTroubleToBreathe() + "'" +
            ", sputum='" + isSputum() + "'" +
            ", soreThroat='" + isSoreThroat() + "'" +
            ", ostTaste='" + isOstTaste() + "'" +
            ", flutter='" + isFlutter() + "'" +
            ", diarrhea='" + isDiarrhea() + "'" +
            ", headache='" + isHeadache() + "'" +
            ", musclePain='" + isMusclePain() + "'" +
            ", notes='" + getNotes() + "'" +
            "}";
    }
}
