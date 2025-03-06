package umm3601.game;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.regex;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.regex.Pattern;

import org.bson.Document;
import org.bson.UuidRepresentation;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.mongojack.JacksonMongoCollection;

import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Sorts;
import com.mongodb.client.result.DeleteResult;

import io.javalin.Javalin;
import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;
import io.javalin.http.NotFoundResponse;
import umm3601.Controller;

/**
 * Controller that manages requests for info about games.
 */
public class GameController implements Controller {

  private static final String API_GAMES = "/api/games";
  private static final String API_GAME_BY_ID = "/api/games/{id}";

  private final JacksonMongoCollection<Game> gameCollection;

  /**
   * Construct a controller for games.
   *
   * @param database the database containing game data
   */
  public GameController(MongoDatabase database) {
    gameCollection = JacksonMongoCollection.builder().build(
        database,
        "games",
        Game.class,
        UuidRepresentation.STANDARD);
  }

  /**
   * Set the JSON body of the response to be the single game
   * specified by the `id` parameter in the request.
   *
   * @param ctx a Javalin HTTP context
   */
  public void getGame(Context ctx) {
    String id = ctx.pathParam("id");
    Game game;

    try {
      game = gameCollection.find(eq("_id", new ObjectId(id))).first();
    } catch (IllegalArgumentException e) {
      throw new BadRequestResponse("The requested game id wasn't a legal Mongo Object ID.");
    }
    if (game == null) {
      throw new NotFoundResponse("The requested game was not found");
    } else {
      ctx.json(game);
      ctx.status(HttpStatus.OK);
    }
  }

  /**
   * Set the JSON body of the response to be a list of all the games returned from the database
   * that match any requested filters and ordering.
   *
   * @param ctx a Javalin HTTP context
   */
  public void getGames(Context ctx) {
    Bson combinedFilter = constructFilter(ctx);
    Bson sortingOrder = constructSortingOrder(ctx);

    ArrayList<Game> matchingGames = gameCollection
      .find(combinedFilter)
      .sort(sortingOrder)
      .into(new ArrayList<>());

    ctx.json(matchingGames);
    ctx.status(HttpStatus.OK);
  }

  private Bson constructFilter(Context ctx) {
    List<Bson> filters = new ArrayList<>(); // start with an empty list of filters

    if (ctx.queryParamMap().containsKey("prompt")) {
      Pattern pattern = Pattern.compile(Pattern.quote(ctx.queryParam("prompt")), Pattern.CASE_INSENSITIVE);
      filters.add(regex("prompt", pattern));
    }

    // Combine the list of filters into a single filtering document.
    Bson combinedFilter = filters.isEmpty() ? new Document() : and(filters);

    return combinedFilter;
  }

  private Bson constructSortingOrder(Context ctx) {
    String sortBy = Objects.requireNonNullElse(ctx.queryParam("sortby"), "_id");
    String sortOrder = Objects.requireNonNullElse(ctx.queryParam("sortorder"), "asc");
    Bson sortingOrder = sortOrder.equals("desc") ? Sorts.descending(sortBy) : Sorts.ascending(sortBy);
    return sortingOrder;
  }

  /**
   * Add a new game to the database.
   *
   * @param ctx a Javalin HTTP context
   */
  public void addNewGame(Context ctx) {
    String body = ctx.body();
    Game newGame = ctx.bodyValidator(Game.class)
      .check(gm -> gm.prompt != null && gm.prompt.length() > 0,
        "Game must have a non-empty prompt; body was " + body)
      .get();

    gameCollection.insertOne(newGame);

    ctx.json(Map.of("id", newGame._id));
    ctx.status(HttpStatus.CREATED);
  }

  /**
   * Delete the game specified by the `id` parameter in the request.
   *
   * @param ctx a Javalin HTTP context
   */
  public void deleteGame(Context ctx) {
    String id = ctx.pathParam("id");
    DeleteResult deleteResult = gameCollection.deleteOne(eq("_id", new ObjectId(id)));
    if (deleteResult.getDeletedCount() != 1) {
      ctx.status(HttpStatus.NOT_FOUND);
      throw new NotFoundResponse(
        "Was unable to delete ID "
          + id
          + "; perhaps illegal ID or an ID for an item not in the system?");
    }
    ctx.status(HttpStatus.OK);
  }

  /**
   * Sets up routes for the `game` collection endpoints.
   *
   * @param server The Javalin server instance
   */
  @Override
  public void addRoutes(Javalin server) {
    // Get the specified game
    server.get(API_GAME_BY_ID, this::getGame);

    // List games, filtered using query parameters
    server.get(API_GAMES, this::getGames);

    // Add new game with the game info being in the JSON body
    // of the HTTP request
    server.post(API_GAMES, this::addNewGame);

    // Delete the specified game
    server.delete(API_GAME_BY_ID, this::deleteGame);
  }
}
