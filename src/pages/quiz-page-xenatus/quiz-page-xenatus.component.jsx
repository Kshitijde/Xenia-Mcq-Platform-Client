//prev,next max limits hardcoded change.

import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { createStructuredSelector } from "reselect";
import {
  setFetchedQuestionsToStateXenatus,
  selectedQuestionNextXenatus,
  selectedQuestionPreviousXenatus,
  setSelectedQuestionXenatus,
  // setRecentFetchedTime
} from "../../redux/xenatus-question/question.actions";
import {
  setFetchedQuestionsToStateXenatus2,
  selectedQuestionNextXenatus2,
  selectedQuestionPreviousXenatus2,
  setSelectedQuestionXenatus2,
  // setRecentFetchedTime
} from "../../redux/xenatus-question-2/question.actions";
import { setRecentFetchedTime } from "../../redux/general/general.actions";
import {
  getSelectedQuestionXenatus,
  getSelectedQuestionNumberXenatus,
  getQuestionsXenatus,
} from "../../redux/xenatus-question/question.selector";
import {
  getSelectedQuestionXenatus2,
  getSelectedQuestionNumberXenatus2,
  getQuestionsXenatus2,
} from "../../redux/xenatus-question-2/question.selector";
import { getRecentFetchedTime } from "../../redux/general/general.selector";

import "./quiz-page.styles.scss";

//import GridComponent from "../../components/grid/grid.component";
import McqComponent from "../../components/mcq-xenatus/mcq.component";
import TimerComponent from "../../components/timer-xenatus/timer.component";
import Loader from "../../components/loader/loader.component";
import TemporaryDrawer from "../../components/drawer-xenatus/TemporaryDrawer";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Xenia21_Logo from "../../assets/Xenia21_Text.png";
import { useEffect } from "react";
// import circuitron from "../../assets/circuitron.png";
// import coutchpotato from "../../assets/CouchPotato.png";
// import CampusToCorporate from "../../assets/CampustoCorporate.png";
import xeNatus from "../../assets/xeNatus.png";

class QuizPageXenatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
    };
  }
  componentDidMount() {
    console.log("this.props is ", this.props);
    console.log("state before setting mounted to true", this.state);
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });

    // if(this.firstTime===false)
    // {
    //   this.firstTime=true;
    //   Location.reload(false)

    // }
    // // 22.30-23.05
    // const date=new Date();
    // console.log("current date is",date.toLocaleString());
    // const prevDate=new Date(2021, 5, 26, 22, 30, 0, 0);
    // console.log("prev date is",prevDate.toLocaleString())
    // const nextDate=new Date(2021, 5, 26, 23, 42, 0, 0);
    // console.log("next date is",nextDate.toLocaleString())
    // console.log("current compared to prev",prevDate<date,nextDate>date);

    // // const date=new Date();
    // // console.log("current date is",date.toLocaleString());
    // // const prevDate=new Date(2021, 5, 26, 19, 30, 0, 0);
    // // console.log("prev date is",prevDate.toLocaleString())
    // // const nextDate=new Date(2021, 5, 26, 20, 55, 0, 0);
    // // console.log("next date is",nextDate.toLocaleString())
    // // console.log("current compared to prev",prevDate<date,nextDate>date);


    // if(!(date>prevDate&&date<nextDate))
    // {
    //   this.props.history.push("/")
    // }else{
    if (this.props.questionsXenatus2.length === 0) {
      axios
        .post("https://mcq-platform-server.herokuapp.com/xenatus/fetchQuestions")
        .then((res) => {
          console.log(res);
          // this.setState(res.data);
          this.props.setFetchedQuestionsToStateXenatus2(res.data);
          this.props.setSelectedQuestionXenatus2(1);
          console.log("action initialised");
          this.setState({ mounted: true }, console.log(this.state));
        })
        .catch(function (error) {
          console.log("an error has occurred : ", error);
        });
    } else {
      this.props.setSelectedQuestionXenatus2(1);
      this.setState({ mounted: true }, () => console.log(this.state));
    }
    console.log(this.props);
    var link =
      "https://mcq-platform-server.herokuapp.com/xenatus/getTime/" +
      this.props.match.params.authToken;
    console.log(link);
    axios
      .post(link)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "Failure") {
          this.props.history.push("/");
        } else {
          if (res.data.time <= 0) {
            this.submit(this, this.props.questionsXenatus2);
          }
          this.props.setRecentFetchedTime(res.data.time);
        }
        // // this.setState(res.data);
        // this.props.setFetchedQuestionsToState(res.data);
        // this.props.setSelectedQuestion(1);
        // console.log("action initialised");
      })
      .catch(function (error) {
        console.log("an error has occurred : ", error);
      });
    
    if (this.props.fetchedTime <= 0) {
      console.log("here in if of will update");
      this.submit(this, this.props.questionsXenatus2);
    }
  // }
  }

  componentWillUpdate() {
    if (this.props.fetchedTime <= 0) {
      console.log("here in if of will update");
      this.submit(this, this.props.questionsXenatus2);
    }
    console.log("Fetched time in main component is", this.props.fetchedTime);
  }

  submit = (reference, response) => {
    console.log("submit clicked");
    console.log("body while sending is", response);
    var txt;
    if (
      window.confirm("Do you want to submit the test?!") ||
      this.props.fetchedTime <= 0
    ) {
      txt = "You pressed OK!";

      var link =
        "https://mcq-platform-server.herokuapp.com/xenatus/saveResponse/" +
        reference.props.match.params.authToken;
      axios
        .post(link, response)
        .then(function (res) {
          console.log("response returned from an endpoint", res.data.score);

          reference.props.history.push({
            pathname: "/thankyou/#!",
            state: { score: res.data.score },
          });
        })
        .catch(function (error) {
          console.log("Network error raised", error);
        });
    } else {
      txt = "You pressed Cancel!";
      window.location.reload();
    }
    console.log(txt);
  };

  render() {
    console.log("state before rendering", this.state);
    return !this.state.mounted ? (
      <Loader />
    ) : (
      <Wrapper>
        <div id="paddingStyle" className="container-fluid">
          <div className="overlay">
            <img src={Xenia21_Logo} width="200px" className="Xenia21Logo" />
            <div>
              {/* <img src={Xenia21_Logo} width="200px" className="EventNameLogo" /> */}
              <img src={xeNatus} width="200px" className="EventNameLogo" />
              {/* <img src={CampusToCorporate} className="EventNameLogo" /> */}
            </div>
            <TemporaryDrawer mounted={this.state.mounted} />
            {/* <div id="timerRow" className="row">
              {/* Instructions */}
            {/* <div className="col-lg-10 col-md-9 col-sm-2 div1"></div> */}
            {/* <div className="col-lg-2 col-md-2 col-sm-10"> */}
            {/* </div> */}
            {/* </div> */}
            <TimerComponent />
            <div className="row">
              {/* Instructions */}
              <div className="col-lg-3 col-md-2 col-sm-12 div1"></div>

              <div className="col-lg-7 col-md-10 col-sm-1">
                <McqComponent />
              </div>
            </div>
            <div className="row row2">
              <div className="col-lg-2.5 col-md-3 col-sm-11 "></div>
              {/* <div className="col-lg-7 col-md-7 col-sm-1">
                <Wrapper>
                  <div className="row row1">
                    <ButtonGroup>
                      <Button
                        variant="contained"
                        color="secondary"
                        className="buttonStyle"
                        onClick={() => {
                          this.props.selectedQuestionPreviousXenatus(
                            this.props.selectedQuestionNumberXenatus
                          );
                          console.log(this.props);
                        }}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        className="buttonStyle"
                        onClick={() => this.submit(this, this.props.questionsXenatus)}
                      >
                        Submit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        className="buttonStyle"
                        onClick={() => {
                          this.props.selectedQuestionNextXenatus(
                            this.props.selectedQuestionNumberXenatus
                          );
                        }}
                      >
                        Next
                      </Button>
                    </ButtonGroup>
                  </div>
                </Wrapper>
              </div> */}
              <div
                style={{
                  display: "flex",
                  flexFlow: "column",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div className="question-button-group">
                  <button
                    onClick={() => {
                      this.props.selectedQuestionPreviousXenatus2(
                        this.props.selectedQuestionNumberXenatus2
                      );
                      console.log(this.props);
                    }}
                  >
                    PREVIOUS
                  </button>
                  <button
                    onClick={() =>
                      this.submit(this, this.props.questionsXenatus2)
                    }
                  >
                    SUBMIT
                  </button>
                  <button
                    onClick={() => {
                      this.props.selectedQuestionNextXenatus2(
                        this.props.selectedQuestionNumberXenatus2
                      );
                    }}
                  >
                    NEXT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.section`
  html {
    overflow: hidden;
  }
  .Xenia21Logo{
    margin-top:-10%;
    width:250px;
    height:125px;
  }
  .EventNameLogo{
    margin-top:-15%;
    
    
  }

  .buttonStyle {
    
    margin-right: 10%;
    
    border-radius:0;
    margin: 0 20px 0px -20px;
    background: #15152D;
    &:hover {
      background: black;
      border: 2px solid #15152D;
      color: #white;
      box-shadow: 1px 1px 2px black, 0 0 45px #15152D, 0 0 5px darkblue;
    }
  }
  .container-fluid {
    padding-right: 0;
    padding-left: 0;
  }
  .row1 {
    display: revert;
    margin-left:-12%;
  }
  .row2{
    margin-top:2%;
    margin-left:7%;
  }
  .row {
    dispplay: revert;
  }
  #timerRow {
    margin-top:-12%:
    margin-right: 2%;
   
  }
  @media only screen and (min-width: 600px) {
    .Xenia21Logo{
      margin-top:-2%;
      width:250px;
      height:125px;
    }
    .EventNameLogo{
      margin-top:-3%;
      width:210px;
      height:80px;
    }
  }
  @media only screen and (max-width: 600px) {
    .Xenia21Logo{
      margin-top:0;
      margin-bottom:-10%;
      
    }
    .EventNameLogo{
      margin-top: -10%;
      margin-bottom: -20%;
     
    }
    .row1 {
      margin-left:8%;
    }
  }
`;

// @media only screen and (min-width: 600px) {
//   .Xenia21Logo{
//     margin-top:-2%;
//     width:280px;
//     height:150px;
//   }
//   .EventNameLogo{
//     margin-top:-5%;

//   }
// }
// @media only screen and (max-width: 600px) {
//   .Xenia21Logo{
//     margin-bottom:-10%;

//   }
//   .EventNameLogo{
//     margin-top: -10%;
//     margin-bottom: -20%;

//   }
// }

const mapDispatchToProps = (dispatch) => ({
  setFetchedQuestionsToStateXenatus2: (questions) =>
    dispatch(setFetchedQuestionsToStateXenatus2(questions)),
  selectedQuestionNextXenatus2: (num) => {
    if (num === 29) {
      window.alert("This is the last question of this quiz!");
      window.location.reload();
    } else {
      dispatch(selectedQuestionNextXenatus2(num));
    }
  },
  selectedQuestionPreviousXenatus2: (num) => {
    if (num === 0) {
    } else {
      dispatch(selectedQuestionPreviousXenatus2(num));
    }
  },
  setSelectedQuestionXenatus2: (num) =>
    dispatch(setSelectedQuestionXenatus2(num)),
  setRecentFetchedTime: (time) => dispatch(setRecentFetchedTime(time)),
});

const mapStateToProps = createStructuredSelector({
  questionsXenatus2: getQuestionsXenatus2,
  selectedQuestionXenatus2: getSelectedQuestionXenatus2,
  selectedQuestionNumberXenatus2: getSelectedQuestionNumberXenatus2,
  fetchedTime: getRecentFetchedTime,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(QuizPageXenatus)
);
