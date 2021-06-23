import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import "./answer.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import styled from "styled-components";
import {
  getSelectedQuestionAnswersCouchPotato,
  getSelectedQuestionCouchPotato,
} from "../../redux/couchPotato-question/question.selector";
import { setSelectedAnswerCouchPotato } from "../../redux/couchPotato-question/question.actions";
import cyan from "@material-ui/core/colors/cyan";

const StyledRadio = styled(Radio)`
  color: ${cyan[400]};
  &.Mui-checked {
    color: ${cyan[600]};
  }
`;
const RadioButtonsGroup = function ({
  answersCouchPotato,
  selectedQuestionCouchPotato,
  setSelectedAnswerCouchPotato,
}) {
  const selectedAnswer = selectedQuestionCouchPotato.selectedAnswer;
  const [value, setValue] = React.useState(selectedAnswer);

  React.useEffect(() => {
    setValue(selectedAnswer);
  }, [selectedAnswer]);

  const handleChange = (event) => {
    setValue(event.target.value);
    setSelectedAnswerCouchPotato(event.target.value);
  };
  //{answers[0].text}
  //{answers[1].text}
  //{answers[2].text}
  //{answers[3].text}
  return (
    <Wrapper>
      <FormControl component="fieldset" className="styling vertical-center-row">
        <RadioGroup
          aria-label="options"
          name="gender1"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="0"
            control={<StyledRadio />}
            label={answersCouchPotato[0]}
            // label="Random Option Opp tion oOO ppp Random Option Opp tion oOO ppp Option Opp tion oOO ppp Option Opp tion oOO ppp Option Opp tion oOO ppp Option Opp tion oOO ppp"
            className="FormControlLabelStyling"
          />
          <FormControlLabel
            value="1"
            control={<StyledRadio />}
            label={answersCouchPotato[1]}
          />
          <FormControlLabel
            value="2"
            control={<StyledRadio />}
            label={answersCouchPotato[2]}
          />
          <FormControlLabel
            value="3"
            control={<StyledRadio />}
            label={answersCouchPotato[3]}
          />
        </RadioGroup>
      </FormControl>
    </Wrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  answersCouchPotato: getSelectedQuestionAnswersCouchPotato,
  selectedQuestionCouchPotato: getSelectedQuestionCouchPotato,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedAnswerCouchPotato: (num) => dispatch(setSelectedAnswerCouchPotato(num)),
});
const Wrapper = styled.section`
  @media only screen and (min-width: 600px) {
    .MuiFormControlLabel-label {
      font-size: 20px;
      font-family: Fenix;
    }
  }
  .MuiRadio-root {
    color: #ffffff80;
  }
`;
export default connect(mapStateToProps, mapDispatchToProps)(RadioButtonsGroup);
