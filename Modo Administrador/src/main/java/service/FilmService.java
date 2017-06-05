package service;

import java.util.List;
import java.util.logging.Logger;

import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import facade.ActorFacade;
import model.Actor;

import facade.FilmFacade;
import model.Film;

import facade.FilmActorFacade;
import model.FilmActor;

@Path("/films")
public class FilmService {

	@EJB
	ActorFacade actorFacadeEJB;

	@EJB
	FilmFacade filmFacadeEJB;

	@EJB
	FilmActorFacade filmActorFacadeEJB;

	Logger logger = Logger.getLogger(FilmService.class.getName());

	@GET
		@Produces({"application/xml", "application/json"})
		public List<Film> findAll(){
			return filmFacadeEJB.findAll();
		}

	@GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Film find(@PathParam("id") Integer id) {
        return filmFacadeEJB.find(id);
    }

  @GET
    @Path("{id}/actors")
    @Produces({"application/xml", "application/json"})
    public List<FilmActor> search(@PathParam("id") Integer id) {
        Film film = filmFacadeEJB.find(id);
				return film.getFilmActor();
    }

	@POST
    @Consumes({"application/xml", "application/json"})
    public void create(Film entity) {
        filmFacadeEJB.create(entity);
    }

	@POST
		@Path("{id}/actors/{actor_id}")
		@Consumes({"application/xml", "application/json"})
		public void createFilmActor(@PathParam("id") Integer id, @PathParam("actor_id") Integer actor_id) {
				FilmActor fa = new FilmActor();
				Actor a = actorFacadeEJB.find(actor_id);
				Film f = filmFacadeEJB.find(id);
				if(a == null){
					//out.print("Actor inexistente");
				}
				else if(f == null){
					//out.print("Film inexistente");
				}
				else{
					fa.setActor(a);
					fa.setFilm(f);
					filmActorFacadeEJB.create(fa);
				}
		}


  @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") Integer id, Film entity) {
    	entity.setFilmId(id.intValue());
        filmFacadeEJB.edit(entity);
    }

}
