import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import questionReducer from "./question/question.reducer";
import generalReducer from "./general/general.reducer";
import circuitronQuestionReducer from "./circuitron-question/question.reducer";
import c2cQuestionReducer from "./c2c-question/question.reducer";
import couchPotatoQuestionReducer from "./couchPotato-question/question.reducer";
import couchPotatoQuestionReducer2 from "./couchPotato-question-2/question.reducer";
import xenatusQuestionReducer from "./xenatus-question/question.reducer";
import xenatusQuestionReducer2 from "./xenatus-question-2/question.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "user",
    "circuitronQuestion",
    "c2cQuestion",
    "xenatusQuestion",
    "xenatusQuestion2",
    "couchPotatoQuestion",
    "couchPotatoQuestion2",
  ],
};

const rootReducer = combineReducers({
  user: userReducer,
  question: questionReducer,
  circuitronQuestion: circuitronQuestionReducer,
  c2cQuestion: c2cQuestionReducer,
  xenatusQuestion: xenatusQuestionReducer,
  couchPotatoQuestion: couchPotatoQuestionReducer,
  couchPotatoQuestion2: couchPotatoQuestionReducer2,
  general: generalReducer,
  xenatusQuestion2: xenatusQuestionReducer2
});

export default persistReducer(persistConfig, rootReducer);
