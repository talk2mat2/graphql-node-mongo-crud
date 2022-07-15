import { gql } from "@apollo/client";

export const getAllusers = gql`
  query {
    allUsers {
      email
      name
      age
    }
  }
`;

export const getlocalhost = gql`
  query {
    locations {
      id
      name
      description
      photo
    }
  }
`;

export const addUser = gql`
  mutation addUser($name: String!, $age: String!, $email: String!) {
    addUsers(name: $name, email: $email, age: $age) {
      email
      name
      age
    }
  }
`;
