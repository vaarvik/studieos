import data from "../../data/studium.json";
import { timeout } from "q";

const initState = data.rows;

const studyReducer = (state = initState, action) => {
  switch (action.type) {
    case "CLICKED":
      return state;
    case "STUDY_RATED":
      const index = state.findIndex(one => action.id == one.Id_soekerportal);
      state[index].currentRating
        ? (state[index].currentRating = action.currentRating)
        : (state[index].currentRating = 1);
      state[index].votes ? state[index].votes++ : (state[index].votes = 1);
      console.log(state[index].votes);
      return state;
    default:
      return state;
  }
};

export default studyReducer;
