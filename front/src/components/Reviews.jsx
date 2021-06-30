import React from "react";
import Container from "@material-ui/core/Container";
// import CardReview from "./CardReview";
import MakeReview from "./MakeReview";
const Reviews = () => {
  return (
    <div>
      <Container>
        <MakeReview />
        {/* <CardReview /> */}
      </Container>
    </div>
  );
};

export default Reviews;
