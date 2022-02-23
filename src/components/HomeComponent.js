import React from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  CardBody,
} from "reactstrap";
import { Loading } from "./LoadingComponent";
import { baseURL } from "../shared/baseUrl";
import { FadeTransform } from 'react-animation-components';

function RenderCard({ item, isLoading, errMsg }) {
  if (isLoading) {
    return <Loading />;
  } else if (errMsg) {
    return <h4> {errMsg} </h4>;
  } else {
    return (
      <FadeTransform in transformProps={{
          exitTransform: 'scale(0.5) translateY(-50%)'
      }}>
      <Card>
        <CardImg src={baseURL + item.image} alt={item.name} />
        <CardBody>
          <CardTitle>{item.name}</CardTitle>
          {item.designation ? (
            <CardSubtitle>{item.designation}</CardSubtitle>
          ) : null}
          <CardText>{item.description}</CardText>
        </CardBody>
      </Card>
      </FadeTransform>
    );
  }
}

function Home(props) {
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.dish}
            isLoading={props.dishesLoading}
            errMsg={props.dishesErrorMsg}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={props.promotion}  
            isLoading={props.promosLoading}
            errMsg={props.promosErrorMsg} />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={props.leader}
          isLoading={props.leaderLoading}
          errMsg={props.leaderErrorMsg} />
        </div>
      </div>
    </div>
  );
}

export default Home;
