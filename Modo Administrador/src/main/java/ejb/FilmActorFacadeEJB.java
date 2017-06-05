package ejb;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import facade.AbstractFacade;
import facade.FilmActorFacade;
import model.FilmActor;

@Stateless
public class FilmActorFacadeEJB extends AbstractFacade<FilmActor> implements FilmActorFacade {


	@PersistenceContext(unitName = "sakilaPU")
	private EntityManager em;

	public FilmActorFacadeEJB() {
		super(FilmActor.class);
	}

	@Override
	protected EntityManager getEntityManager() {
		return this.em;
	}

}
