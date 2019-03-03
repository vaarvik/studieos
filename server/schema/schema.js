const graphql = require("graphql");
const Study = require("../models/studies");
const School = require("../models/schools");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const StudyType = new GraphQLObjectType({
  name: "Study",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    school: {
      type: SchoolType,
      resolve: (parent, args) => {
        // const temp = School.filter(scho => {
        //   return scho.id === parent.schoolId;
        // });
        // return temp;
        console.log(parent.schoolId);
        return School.findById(parent.schoolId);
      }
    }
  })
});

const SchoolType = new GraphQLObjectType({
  name: "School",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    studies: {
      type: new GraphQLList(StudyType),
      resolve: (parent, args) => {
        return Study.find({ schoolId: parent.id });
      }
    }
  })
});

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    study: {
      type: StudyType,
      args: { name: { type: GraphQLString } },
      resolve(parent, args) {
        return Study.findOne({ name: args.name });
      }
    },
    school: {
      type: SchoolType,
      args: { name: { type: GraphQLString } },
      resolve(parent, args) {
        return School.findOne({ name: args.name });
        // return School.find(one => {
        //   return one.name === args.name;
        // });
      }
    },
    studies: {
      type: new GraphQLList(StudyType),
      resolve: (parent, args) => {
        return Study.find({});
      }
    },
    schools: {
      type: new GraphQLList(SchoolType),
      resolve: (parent, args) => {
        return School.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addStudy: {
      type: StudyType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        schoolId: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let study = new Study({
          name: args.name,
          schoolId: args.schoolId
        });
        console.log(study);
        return study.save();
      }
    },
    addSchool: {
      type: SchoolType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let school = new School({
          name: args.name
        });
        return school.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: Mutation
});
