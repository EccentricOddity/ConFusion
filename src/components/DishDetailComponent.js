/* eslint-disable react/jsx-pascal-case */
import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseURL } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

function RenderDish({ dish }) {
  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: "scale(0.5) translateY(-50%)",
      }}
    >
      <Card>
        <CardImg top src={baseURL + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </FadeTransform>
  );
}

const RenderComments = ({ comments, postComment, dishId }) => {
  /** Gets date in required comment date format */
  const getCommentDate = (dateTimeStamp) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date(Date.parse(dateTimeStamp)));
  };
  return (
    <div>
      <h4> Comments </h4>
      <Stagger in>
      {comments.map((comment) => {
        return (
          <Fade in>
          <Fragment key={comment.id}>
            <div>{comment.comment}</div>
            <div className="mt-2">
              {`--${comment.author}, ${getCommentDate(comment.date)}`}
            </div>
            <br />
          </Fragment>
          </Fade>
        );
      })}
      </Stagger>
      <div className="col-12 col-md-5">
        <CommentForm
          openModal={true}
          dishId={dishId}
          postComment={postComment}
        />
      </div>
    </div>
  );
};

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor() {
    super();
    this.state = { openCommentModal: false };
    this.toggleCommentModal = this.toggleCommentModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleCommentModal() {
    this.setState({ openCommentModal: !this.state.openCommentModal });
  }

  handleSubmit(values) {
    this.toggleCommentModal();
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.commenterName,
      values.comment
    );
  }

  render() {
    return (
      <Fragment>
        <Button
          outline
          style={{ width: 200 }}
          onClick={this.toggleCommentModal}
        >
          <span className="fa fa-pencil fa-lg mr-1"></span> Submit Comment
        </Button>
        <Modal
          toggle={this.toggleCommentModal}
          isOpen={this.state.openCommentModal}
        >
          <ModalHeader toggle={this.toggleCommentModal}>
            Submit Comment
          </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="firstName" md={12}>
                  Rating
                </Label>
                <Col md={12}>
                  <Control.select
                    model=".rating"
                    id="rating"
                    name="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="firstName" md={12}>
                  Your Name
                </Label>
                <Col md={12}>
                  <Control.text
                    className="form-control"
                    model=".commenterName"
                    type="text"
                    name="commenterName"
                    placeholder="Your Name"
                    validators={{
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".commenterName"
                    show="touched"
                    messages={{
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={12}>
                  Comment
                </Label>
                <Col md={12}>
                  <Control.textarea
                    className="form-control"
                    model=".comment"
                    type="textarea"
                    id="comment"
                    name="comment"
                    rows="6"
                  ></Control.textarea>
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

function DishDetail(props) {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errorMsg) {
    return (
      <div className="container">
        <div className="row">
          <h4> {props.errorMsg}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5">
            <RenderComments
              comments={props.comments}
              postComment={props.postComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <Fragment />;
  }
}

export default DishDetail;
