import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCategories } from "../redux/actions/categoryActions";

import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import { makeStyles, useTheme, MobileStepper, Button } from "@material-ui/core/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

//imagines carrousel precargado

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    flexGrow: 1,
    marginTop: '10px',
    height: 'auto',
  },
  img: {
    maxHeight: 490,
    display: "block",
    maxWidth: "100%",
    overflow: "hidden",
    width: "100%",
  },
}));

export default function Carouselmages() {
  const categories = useSelector((store) => store.categories.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {categories.map((step) => (
          <div key={step.label}>
            <img className={classes.img} src={step.image} alt={step.label} />
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        variant="dots"
        steps={categories.length}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === categories.length - 1}
          >
            Siguente
            {theme.direction === "rtl" ? (
              <FontAwesomeIcon icon={faChevronCircleLeft} />
            ) : (
              <FontAwesomeIcon icon={faChevronCircleRight} />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <FontAwesomeIcon icon={faChevronCircleRight} />
            ) : (
              <FontAwesomeIcon icon={faChevronCircleLeft} />
            )}
            Anterior
          </Button>
        }
      />
    </div>
  );
}
