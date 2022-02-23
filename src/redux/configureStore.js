import { createStore, combineReducers, applyMiddleware } from "redux";
import { DishesReducer } from "./dishes";
import { CommentsReducer } from "./comments";
import { PromotionsReducer } from "./promotions";
import { LeadersReducer } from "./leaders";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createForms } from "react-redux-form";
import { InitialFeedback } from "./forms";

export const configureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: DishesReducer,
      comments: CommentsReducer,
      promotions: PromotionsReducer,
      leaders: LeadersReducer,
      ...createForms({ feedback: InitialFeedback }),
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
