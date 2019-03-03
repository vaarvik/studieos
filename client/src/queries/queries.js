import { gql } from "apollo-boost";

const getSchoolsQuery = gql`
  {
    schools {
      name
      id
    }
  }
`;

export { getSchoolsQuery };
