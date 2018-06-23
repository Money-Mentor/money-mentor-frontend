const GET_QUIZ_PERSONALITY = 'GET_QUIZ_PERSONALITY';

export const getQuizPersonality = result => ({
  type: GET_QUIZ_PERSONALITY,
  result
});

const defaultResult = '';

export default (state = defaultResult, action) => {
  switch (action.type) {
    case GET_QUIZ_PERSONALITY:
      return action.result;
    default:
      return state;
  }
};
