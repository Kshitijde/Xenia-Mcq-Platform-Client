import {createSelector} from 'reselect';

const question=state=>state.couchPotatoQuestion2;

export const getQuestionsCouchPotato2=createSelector(
    [question],
    question=>question.questions
)

export const getSelectedQuestionCouchPotato2=createSelector(
    [question],
    question=>question.selectedQuestion
);

export const getSelectedQuestionAnswersCouchPotato2=createSelector(
    [getSelectedQuestionCouchPotato2],
    getSelectedQuestion=>getSelectedQuestion.answers
);

export const getSelectedQuestionNumberCouchPotato2=createSelector(
    [question],
    question=>question.selectedQuestionNumber
);

// export const getRecentFetchedTime=createSelector(
//     [question],
//     question=>question.recentFetchedTime
// );