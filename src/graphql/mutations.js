/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserInfo = /* GraphQL */ `
  mutation CreateUserInfo(
    $input: CreateUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    createUserInfo(input: $input, condition: $condition) {
      id
      name
      success_code
      node_index
      node_parent
      node_value
      node_time
      click_index
      click_type
      click_time
      createdAt
      updatedAt
    }
  }
`;
export const updateUserInfo = /* GraphQL */ `
  mutation UpdateUserInfo(
    $input: UpdateUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    updateUserInfo(input: $input, condition: $condition) {
      id
      name
      success_code
      node_index
      node_parent
      node_value
      node_time
      click_index
      click_type
      click_time
      createdAt
      updatedAt
    }
  }
`;
export const deleteUserInfo = /* GraphQL */ `
  mutation DeleteUserInfo(
    $input: DeleteUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    deleteUserInfo(input: $input, condition: $condition) {
      id
      name
      success_code
      node_index
      node_parent
      node_value
      node_time
      click_index
      click_type
      click_time
      createdAt
      updatedAt
    }
  }
`;
export const createSeedword = /* GraphQL */ `
  mutation CreateSeedword(
    $input: CreateSeedwordInput!
    $condition: ModelSeedwordConditionInput
  ) {
    createSeedword(input: $input, condition: $condition) {
      seed
      time_allowed
      createdAt
      updatedAt
    }
  }
`;
export const updateSeedword = /* GraphQL */ `
  mutation UpdateSeedword(
    $input: UpdateSeedwordInput!
    $condition: ModelSeedwordConditionInput
  ) {
    updateSeedword(input: $input, condition: $condition) {
      seed
      time_allowed
      createdAt
      updatedAt
    }
  }
`;
export const deleteSeedword = /* GraphQL */ `
  mutation DeleteSeedword(
    $input: DeleteSeedwordInput!
    $condition: ModelSeedwordConditionInput
  ) {
    deleteSeedword(input: $input, condition: $condition) {
      seed
      time_allowed
      createdAt
      updatedAt
    }
  }
`;
