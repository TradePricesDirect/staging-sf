import gql from "graphql-tag";
import { useMutation } from "react-apollo";

const orderAddNoteMutation = gql`
  mutation orderAddNote($id: ID!, $message: String!) {
    orderAddNote(order: $id, input: { message: $message }) {
      errors {
        code
        field
        message
      }
    }
  }
`;

export const useOrderAddNoteMutation = () => {
  return useMutation(orderAddNoteMutation);
};
