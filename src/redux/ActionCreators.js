import * as ActionTypes from "./ActionTypes";
import { baseURL } from "../shared/baseUrl";

//------------- dishes ----------------//

export const fetchDishesCreator = () => (dispatch) => {
  dispatch(dishesLoadingCreator(true));
  return fetch(baseURL + "dishes")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + ":" + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMsg = new Error(error.message);
        throw errMsg;
      }
    )
    .then((response) => response.json())
    .then((dishes) => dispatch(addDishesCreator(dishes)))
    .catch((errors) => dispatch(dishesFailedCreator(errors)));
};

export const dishesLoadingCreator = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailedCreator = (errMsg) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errMsg.message,
});

export const addDishesCreator = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

//------------- Comments ----------------//
export const fetchCommentsCreator = () => (dispatch) => {
  return fetch(baseURL + "comments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + ":" + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMsg = new Error(error.message);
        throw errMsg;
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addCommentsCreator(comments)))
    .catch((errors) => dispatch(commentsFailedCreator(errors)));
};

export const commentsFailedCreator = (errMsg) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errMsg.message,
});

export const addCommentsCreator = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

//Action to be dispatched
export const addCommentCreator = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

export const postCommentCreator =
  (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
      dishId: dishId,
      rating: rating,
      author: author,
      comment: comment,
    };
    newComment.date = new Date().toISOString();
    return fetch(baseURL + "comments", {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error" + response.status + ":" + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          var errMsg = new Error(error.message);
          throw errMsg;
        }
      )
      .then((response) => response.json())
      .then((response) => dispatch(addCommentCreator(response)))
      .catch((error) => {
        console.log("Post comments" + error.message);
        alert("Your comment could not be posted\nError: " + error.message);
      });
  };

//------------- Promotions ----------------//
export const fetchPromosCreator = () => (dispatch) => {
  dispatch(promosLoadingCreator(true));
  return fetch(baseURL + "promotions")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + ":" + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMsg = new Error(error.message);
        throw errMsg;
      }
    )
    .then((response) => response.json())
    .then((promos) => dispatch(addPromosCreator(promos)))
    .catch((errors) => dispatch(promosFailedCreator(errors)));
};

export const promosLoadingCreator = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const promosFailedCreator = (errMsg) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errMsg.message,
});

export const addPromosCreator = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});

//------------- Leaders ----------------//

export const fetchLeadersCreator = () => (dispatch) => {
  dispatch(dishesLoadingCreator(true));
  return fetch(baseURL + "leaders")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + ":" + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMsg = new Error(error.message);
        throw errMsg;
      }
    )
    .then((response) => response.json())
    .then((leaders) => dispatch(addLeadersCreator(leaders)))
    .catch((errors) => dispatch(leadersFailedCreator(errors)));
};

export const leadersLoadingCreator = () => ({
  type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailedCreator = (errMsg) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errMsg.message,
});

export const addLeadersCreator = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders,
});

export const addFeedbackCreator = (feedback) => {
  alert(JSON.stringify(feedback));
  return{
  type: ActionTypes.ADD_FEEDBACK,
  payload: feedback,
}};

export const postFeedback = (values) => (dispatch) => {
 
  const newFeedback = {
    firstname: values.firstName,
    lastname: values.lastName,
    telnum: values.telNum,
    email: values.email,
    agree: values.agree,
    contactType: values.contactType,
    message: values.message,
    date: values.date
  };
  newFeedback.date = new Date().toISOString();
  return fetch(baseURL + "feedback ", {
    method: "POST",
    body: JSON.stringify(newFeedback),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + ":" + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMsg = new Error(error.message);
        throw errMsg;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addFeedbackCreator(response)))
    .catch((error) => {
      console.log("Post Feedback" + error.message);
      alert("Your feedback could not be posted\nError: " + error.message);
    });
};
