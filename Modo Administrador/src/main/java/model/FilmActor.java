package model;

import java.io.Serializable;
import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;


/**
 * The persistent class for the actor database table.
 *
 */
@Entity
@Table(name="film_actor")
@NamedQuery(name="FilmActor.findAll", query="SELECT a FROM FilmActor a")
public class FilmActor implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@ManyToOne @JoinColumn(name = "film_id", nullable=false)
	private Film film;

	@Id
	@ManyToOne @JoinColumn(name = "actor_id", nullable=false)
	private Actor actor;

	@Column(name="last_update", nullable=false)
	private Timestamp lastUpdate;

	public FilmActor() {
	}

	public Film getFilm() {
		return this.film;
	}

	public void setFilm(Film film) {
		this.film = film;
	}

	public Actor getActor() {
		return this.actor;
	}

	public void setActor(Actor actor) {
		this.actor = actor;
	}

	public Timestamp getLastUpdate() {
		return this.lastUpdate;
	}

	public void setLastUpdate(Timestamp lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

}
