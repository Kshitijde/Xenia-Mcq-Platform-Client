import {QuestionActionTypes} from './question.types';

export const setFetchedQuestionsToStateXenatus2=questions=>({
    type:QuestionActionTypes.SET_FETCHED_QUESTIONS_TO_STATE_XENATUS2,
    payload:questions
})

export const setSelectedQuestionXenatus2=num=>({
    type:QuestionActionTypes.SET_SELECTED_QUESTION_XENATUS2,
    payload:num-1
})

export const setSelectedAnswerXenatus2=num=>({
    type:QuestionActionTypes.SET_SELECTED_ANSWER_XENATUS2,
    payload:num
})

export const selectedQuestionNextXenatus2=num=>({
    type:QuestionActionTypes.SELECTED_QUESTION_NEXT_XENATUS2,
    payload:num+1
})

export const selectedQuestionPreviousXenatus2=num=>({
    type:QuestionActionTypes.SELECTED_QUESTION_PREVIOUS_XENATUS2,
    payload:num-1
})

// export const setRecentFetchedTime=time=>({
//     type:QuestionActionTypes.SET_RECENT_FETCHED_TIME,
//     payload:time
// })