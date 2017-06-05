package model;

import java.io.Serializable;
import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;
import java.util.Set;


/**
 * The persistent class for the actor database table.
 *
 */
@Entity
@Table(name="film")
@NamedQuery(name="Film.findAll", query="SELECT a FROM Film a")
public class Film implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="film_id", unique=true, nullable=false)
	private int filmId;

	@Column(name="description", nullable=true, length=99)
	private String description;

	@Column(name="length", nullable=false)
	private int length;

	@Column(name="rating", nullable=false, length=99)
	private String rating;

	@Column(name="release_year", nullable=false)
	private int releaseYear;

	@Column(name="rental_duration", nullable=false)
	private int rentalDuration;

	@Column(name="rental_rate", nullable=false)
	private float rentalRate;

	@Column(name="replacement_cost", nullable=false)
	private float replacementCost;

	@Column(name="title", nullable=false, length=99)
	private String title;

	@Column(name="last_update", nullable=false)
	private Timestamp lastUpdate;

	@OneToMany(mappedBy="film", cascade=CascadeType.ALL, fetch = FetchType.LAZY)
	private List<FilmActor> film_actor;

	public Film() {
	}

	public int getFilmId() {
		return this.filmId;
	}

	public String getDescription() {
		return this.description;
	}

	public int getLength() {
		return this.length;
	}

	public String getRating() {
		return this.rating;
	}

	public int getReleaseYear() {
		return this.releaseYear;
	}

	public int getRentalDuration() {
		return this.rentalDuration;
	}

	public float getRentalRate() {
		return this.rentalRate;
	}

	public float getReplacementCost() {
		return this.replacementCost;
	}

	public String getTittle() {
		return this.title;
	}

	public List<FilmActor> getFilmActor() {
		return this.film_actor;
	}

	public Timestamp getLastUpdate() {
		return this.lastUpdate;
	}

	public void setFilmId(int filmId) {
		this.filmId = filmId;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setLength(int length) {
		this.length = length;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	public void setReleaseYear(int releaseYear) {
		this.releaseYear = releaseYear;
	}

	public void setRentalDuration(int rentalDuration) {
		this.rentalDuration = rentalDuration;
	}

	public void setRentalRate(float rentalRate) {
		this.rentalRate = rentalRate;
	}

	public void setReplacementCost(float replacementCost) {
		this.replacementCost = replacementCost;
	}

	public void setTittle(String title) {
		this.title = title;
	}

	public void setLastUpdate(Timestamp lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

}
