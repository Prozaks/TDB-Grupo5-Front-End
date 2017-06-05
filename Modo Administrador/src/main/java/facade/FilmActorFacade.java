package facade;

import java.util.List;

import javax.ejb.Local;

import model.FilmActor;

@Local
public interface FilmActorFacade {

	public void create(FilmActor entity);

	public void edit(FilmActor entity);

	public void remove(FilmActor entity);

	public FilmActor find(Object id);

	public List<FilmActor> findAll();

	public List<FilmActor> findRange(int[] range);

	public int count();

}
