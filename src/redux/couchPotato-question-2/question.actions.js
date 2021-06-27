import {QuestionActionTypes} from './question.types';

export const setFetchedQuestionsToStateCouchPotato2=questions=>({
    type:QuestionActionTypes.SET_FETCHED_QUESTIONS_TO_STATE_COUCH_POTATO2,
    payload:questions
})

export const setSelectedQuestionCouchPotato2=num=>({
    type:QuestionActionTypes.SET_SELECTED_QUESTION_COUCH_POTATO2,
    payload:num-1
})

export const setSelectedAnswerCouchPotato2=num=>({
    type:QuestionActionTypes.SET_SELECTED_ANSWER_COUCH_POTATO2,
    payload:num
})

export const selectedQuestionNextCouchPotato2=num=>({
    type:QuestionActionTypes.SELECTED_QUESTION_NEXT_COUCH_POTATO2,
    payload:num+1
})

export const selectedQuestionPreviousCouchPotato2=num=>({
    type:QuestionActionTypes.SELECTED_QUESTION_PREVIOUS_COUCH_POTATO2,
    payload:num-1
})

// export const setRecentFetchedTime=time=>({
//     type:QuestionActionTypes.SET_RECENT_FETCHED_TIME,
//     payload:time
// })