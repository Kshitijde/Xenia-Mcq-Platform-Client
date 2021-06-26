import {createSelector} from 'reselect';

const question=state=>state.XenatusQuestion2;

export const getQuestionsXenatus2=createSelector(
    [question],
    question=>question.questions
)

export const getSelectedQuestionXenatus2=createSelector(
    [question],
    question=>question.selectedQuestion
);

export const getSelectedQuestionAnswersXenatus2=createSelector(
    [getSelectedQuestionXenatus2],
    getSelectedQuestion=>getSelectedQuestion.answers
);

export const getSelectedQuestionNumberXenatus2=createSelector(
    [question],
    question=>question.selectedQuestionNumber
);

// export const getRecentFetchedTime=createSelector(
//     [question],
//     question=>question.recentFetchedTime
// );