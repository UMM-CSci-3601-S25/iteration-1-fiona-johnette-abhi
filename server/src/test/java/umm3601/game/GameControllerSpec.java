package umm3601.game;


import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List; // Add this import statement
import java.util.Map;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;

import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import io.javalin.http.Context;

/**
 * Tests the logic of the GameController.
 */
@SuppressWarnings({ "MagicNumber" })
class GameControllerSpec {

  private ObjectId gameId;

  private static MongoClient mongoClient;
  private static MongoDatabase db;

  @Mock
  private Context ctx;

  @Captor
  private ArgumentCaptor<ArrayList<Game>> gameArrayListCaptor;

  @Captor
  private ArgumentCaptor<Game> gameCaptor;

  @Captor
  private ArgumentCaptor<Map<String, String>> mapCaptor;

  @BeforeAll
  static void setupAll() {
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");

    mongoClient = MongoClients.create(
        MongoClientSettings.builder()
            .applyToClusterSettings(builder -> builder.hosts(Arrays.asList(new ServerAddress(mongoAddr))))
            .build());
    db = mongoClient.getDatabase("test");
  }

  @AfterAll
  static void teardown() {
    db.drop();
    mongoClient.close();
  }

  @BeforeEach
  void setupEach() throws IOException {
    MockitoAnnotations.openMocks(this);

    MongoCollection<Document> gameDocuments = db.getCollection("games");
    gameDocuments.drop();
    List<Document> testGames = new ArrayList<>();
    testGames.add(
        new Document()
            .append("prompt", "If animals could talk, which one would be the rudest?"));
    testGames.add(
        new Document()
            .append("prompt", "What's the weirdest thing you’ve seen someone do in public?"));
    testGames.add(
        new Document()
            .append("prompt", "If you could have any superpower, but it had to be completely useless, what would it be?"));

    gameId = new ObjectId();
    Document game = new Document()
        .append("_id", gameId)
        .append("prompt", "What’s the funniest thing you’ve ever overheard?");

    gameDocuments.insertMany(testGames);
    gameDocuments.insertOne(game);


  }


}
