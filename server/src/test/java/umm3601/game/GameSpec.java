package umm3601.game;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class GameSpec {

  private static final String FAKE_ID_STRING_1 = "fakeIdOne";
  private static final String FAKE_ID_STRING_2 = "fakeIdTwo";

  private Game game1;
  private Game game2;

  @BeforeEach
  void setupEach() {
    game1 = new Game();
    game2 = new Game();
  }

  @Test
  void gamesWithEqualIdAreEqual() {
    game1._id = FAKE_ID_STRING_1;
    game2._id = FAKE_ID_STRING_1;

    assertTrue(game1.equals(game2));
  }

  @Test
  void gamesWithDifferentIdAreNotEqual() {
    game1._id = FAKE_ID_STRING_1;
    game2._id = FAKE_ID_STRING_2;

    assertFalse(game1.equals(game2));
  }

  @Test
  void hashCodesAreBasedOnId() {
    game1._id = FAKE_ID_STRING_1;
    game2._id = FAKE_ID_STRING_1;

    assertTrue(game1.hashCode() == game2.hashCode());
  }

  @SuppressWarnings("unlikely-arg-type")
  @Test
  void gamesAreNotEqualToOtherKindsOfThings() {
    game1._id = FAKE_ID_STRING_1;
    // a game is not equal to its id even though id is used for checking equality
    assertFalse(game1.equals(FAKE_ID_STRING_1));
  }
}
