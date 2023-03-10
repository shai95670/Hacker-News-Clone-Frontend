import { gql } from '@apollo/client';

const GET_LINKS_QUERY = gql`
    query GetLinks(
      $filter: String = ""
      $skip: Int = 0
      $take: Int = 0
    ) {
      getLinks(filter: $filter, skip: $skip, take: $take) {
            links {
              description
              id
              url
              postedBy {
                email
              }
              voters {
                email
                id
              }
              createdAt
            }
            linksCount
        }
    }    
`;

const CREATE_LINK_MUTATION = gql`
    mutation createLink($description: String! $url: String!) {
        createLink(description: $description, url: $url) {
            id
            createdAt
            url
            description
            postedBy {
              email
            }
            voters {
              email
              id
            }
        }  
    }
`;

const VOTE_MUTATION = gql`
  mutation VoteByLinkId($voteByLinkIdId: Int!) {
    voteByLinkId(id: $voteByLinkIdId) {
      id
      user {
        email
        id
      }
      link {
        description
        id
        createdAt
        voters {
          email
          id
        }
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;

const SIGNUP_MUTATION = gql `
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;

export {
   GET_LINKS_QUERY,
   CREATE_LINK_MUTATION,
   VOTE_MUTATION,
   LOGIN_MUTATION,
   SIGNUP_MUTATION
};