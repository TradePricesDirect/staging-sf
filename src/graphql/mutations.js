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

const updateMetadataMutation = gql`
  mutation updateMetaData($id: ID!, $input: [MetadataInput!]!) {
    updateMetadata(id: $id, input: $input) {
      errors {
        code
        message
      }
    }
  }
`;

export const useUpdateMetadataMutation = () => {
  return useMutation(updateMetadataMutation);
};

const deleteMetadataMutation = gql`
  mutation deleteMetaData($id: ID!, $keys: [String!]!) {
    deleteMetadata(id: $id, keys: $keys) {
      errors {
        code
        message
      }
    }
  }
`;

export const useDeleteMetadataMutation = () => {
  return useMutation(deleteMetadataMutation);
};
