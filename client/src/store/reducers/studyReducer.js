import data from "../../data/studium.json";

const initState = data.rows;

const studyReducer = (state = initState, action) => {
  switch (action.type) {
    case "CLICKED":
      return state;
    case "STUDY_RATED":
      const index = state.findIndex(one => action.id === one.Id_soekerportal);
      state[index].votes ? state[index].votes++ : (state[index].votes = 1);
      state[index].currentRating = action.currentRating;
      return state;
    default:
      return state;
  }
};

export default studyReducer;
