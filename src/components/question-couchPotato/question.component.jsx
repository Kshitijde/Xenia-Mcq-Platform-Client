import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import "./question.styles.scss";
// import { colors } from "@material-ui/core";
import styled from "styled-components";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { getSelectedQuestionCouchPotato,getSelectedQuestionNumberCouchPotato } from "../../redux/couchPotato-question/question.selector";
import { getSelectedQuestionCouchPotato2,getSelectedQuestionNumberCouchPotato2 } from "../../redux/couchPotato-question-2/question.selector";


const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      height: 90,
    },
  },
  media: {
    height: 140,
    width: 280,
    margin: "auto",
    marginBottom: 20,
    marginTop: -25,
  },
}));

function HaveCardMedia({ image }) {
  const classes = useStyles();
  return (
    <CardMedia className={classes.media}>
      <img
        className={classes.media}
        // src="https://dl.dropboxusercontent.com/s/4tbw338pzuk6dro/i01_WhatsApp%20Image%202021-06-17%20at%2011.43.31%20AM.jpeg?dl=0"
        src={image}
        // src="https://dl.dropboxusercontent.com/s/mx1l2cvcnulihr4/Screenshot%20%28351%29.png?dl=0"
      />
    </CardMedia>
  );
}

function NoCardMedia(props) {
  const classes = useStyles();
  return <div></div>;
}


const Question = function ({ questionCouchPotato2,questionNumberCouchPotato2}) {
  const classes = useStyles();
  const [value, setValue] = React.useState("Controlled");

  const isImage = questionCouchPotato2.image;
  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };
  return (
    <Wrapper>
      <form className={classes.root} noValidate autoComplete="off">
        <div className="question" style={{ justifyItems: "left" }}>
          <TextField
            id="standard-multiline-flexible"
            label={`Question #${questionNumberCouchPotato2+1}`}
            multiline
            rowsMax={3}
            // value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna  sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna sha "
            value={questionCouchPotato2.content}
            // onChange={handleChange}
            InputProps={{
              style: { fontSize: 25 },
              readOnly: true,
              disableUnderline: true,
            }}
          />

          {isImage != undefined ? (
            <HaveCardMedia image={questionCouchPotato2.image} />
          ) : (
            <NoCardMedia />
          )}
          {/* Uncomment card media to bring image  */}
          {/* <CardMedia className={classes.media}>
            <img
              className={classes.media}
              src="https://dl.dropboxusercontent.com/s/4tbw338pzuk6dro/i01_WhatsApp%20Image%202021-06-17%20at%2011.43.31%20AM.jpeg?dl=0"
            />
          </CardMedia> */}
        </div>
      </form>
    </Wrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  questionCouchPotato2: getSelectedQuestionCouchPotato2,
  questionNumberCouchPotato2: getSelectedQuestionNumberCouchPotato2
});
const Wrapper = styled.section`
  .media {
    height: 140px;
    width: 280px;

    margin: auto;
    margin-bottom: 20;
    margin-top: -25;
    object-fit: scale-down;
    display: block;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export default connect(mapStateToProps, null)(Question);
