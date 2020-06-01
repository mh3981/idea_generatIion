/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserInfo = /* GraphQL */ `
  query GetUserInfo($id: ID!) {
    getUserInfo(id: $id) {
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
export const listUserInfos = /* GraphQL */ `
  query ListUserInfos(
    $filter: ModelUserInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getSeedword = /* GraphQL */ `
  query GetSeedword($id: ID!) {
    getSeedword(id: $id) {
      seed
      time_allowed
      createdAt
      updatedAt
    }
  }
`;
export const listSeedwords = /* GraphQL */ `
  query ListSeedwords(
    $filter: ModelSeedwordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSeedwords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        seed
        time_allowed
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
