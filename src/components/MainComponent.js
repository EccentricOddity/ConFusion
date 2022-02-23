import Home from "./HomeComponent";
import React from "react";
import Menu from "./MenuComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import DishDetail from "./DishDetailComponent";
import { connect } from "react-redux";
import {
  postCommentCreator,
  fetchDishesCreator,
  fetchPromosCreator,
  fetchCommentsCreator,
  fetchLeadersCreator,
  postFeedback,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => {
    dispatch(fetchDishesCreator());
  },

  fetchLeaders: () => {
    dispatch(fetchLeadersCreator());
  },

  fetchComments: () => {
    dispatch(fetchCommentsCreator());
  },

  postComment: (dishId, rating, author, comment) =>
    dispatch(postCommentCreator(dishId, rating, author, comment)),

  postFeedback: (values) => dispatch(postFeedback(values)),

  fetchPromos: () => {
    dispatch(fetchPromosCreator());
  },

  resetFeedbackForm: () => dispatch(actions.reset("feedback")),
});

class Main extends React.Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((x) => x.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrorMsg={this.props.dishes.errMsg}
          promotion={this.props.promotions.promos.filter((x) => x.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrorMsg={this.props.promotions.errMsg}
          leader={this.props.leaders.leaders.filter((x) => x.featured)[0]}
          leaderLoading={this.props.leaders.isLoading}
          leaderErrorMsg={this.props.leaders.errMsg}
        />
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (x) => x.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errorMsg={this.props.dishes.errMsg}
          commentsErrorMsg={this.props.comments.errMsg}
          postComment={this.props.postComment}
          comments={this.props.comments.comments.filter(
            (x) => x.dishId === parseInt(match.params.dishId, 10)
          )}
        />
      );
    };

    const AboutPage = () => {
      return <About leaders={this.props.leaders} />;
    };

    return (
      <div className="app">
        <Header />
        <TransitionGroup>
          <CSSTransition key = {this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route
                exact
                path="/menu"
                component={() => <Menu dishes={this.props.dishes} />}
              />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route
                exact
                path="/contactus"
                component={() => (
                  <Contact
                    resetFeedbackForm={this.props.resetFeedbackForm}
                    postFeedback={this.props.postFeedback}
                  />
                )}
              />
              <Route exact path="/aboutus" component={AboutPage} />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

//connecting main to redux store and sending state as props using map state to props
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
