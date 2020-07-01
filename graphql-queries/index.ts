import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  hello: Scalars['String'];
  me?: Maybe<User>;
  roles: Array<Role>;
  getStaff: Array<User>;
  allPosts: Array<Post>;
  allPostDrafts: Array<Post>;
  getDraft?: Maybe<Post>;
  getPost?: Maybe<Post>;
  getPublicPost: Post;
  getLatestPublicPosts: LatestPosts;
  getPinnedPublicPosts: Array<Post>;
  getPinnedPublicPaths: Array<PublicPath>;
  getPinnedPublicPost: Post;
  getAlbums: Array<Scalars['String']>;
  viewAlbum: Array<AwsPhoto>;
  labels: Array<Scalars['String']>;
  allTags: Array<Tag>;
};


export type QueryGetDraftArgs = {
  _id: Scalars['String'];
};


export type QueryGetPostArgs = {
  _id: Scalars['String'];
};


export type QueryGetPublicPostArgs = {
  _id: Scalars['String'];
};


export type QueryGetLatestPublicPostsArgs = {
  take: Scalars['Float'];
  skip: Scalars['Float'];
};


export type QueryGetPinnedPublicPostArgs = {
  _id: Scalars['String'];
};


export type QueryViewAlbumArgs = {
  albumName: Scalars['String'];
};


export type QueryAllTagsArgs = {
  localeId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  email: Scalars['String'];
  roles?: Maybe<Array<Scalars['String']>>;
  dob?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  whatsapp?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  messenger?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  description?: Maybe<Array<UserDescription>>;
};

export type UserDescription = {
  __typename?: 'UserDescription';
  localeId: Scalars['String'];
  text: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  created?: Maybe<Scalars['Float']>;
  updated?: Maybe<Scalars['Float']>;
  published?: Maybe<Scalars['Float']>;
  language?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  _id: Scalars['String'];
  deleted?: Maybe<Scalars['Float']>;
  translations: Array<PostData>;
  starred?: Maybe<Scalars['Boolean']>;
};

export type PostData = {
  __typename?: 'PostData';
  author?: Maybe<User>;
  created?: Maybe<Scalars['Float']>;
  updated?: Maybe<Scalars['Float']>;
  published?: Maybe<Scalars['Float']>;
  language?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type LatestPosts = {
  __typename?: 'LatestPosts';
  posts: Array<Post>;
  total: Scalars['Float'];
};

export type PublicPath = {
  __typename?: 'PublicPath';
  _id: Scalars['String'];
  titles: Array<Title>;
};

export type Title = {
  __typename?: 'Title';
  localeId: Scalars['String'];
  title: Scalars['String'];
};

export type AwsPhoto = {
  __typename?: 'AwsPhoto';
  photoKey: Scalars['String'];
  photoUrl: Scalars['String'];
  name: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  tag: Scalars['String'];
  localeId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResponse;
  logout: Scalars['Boolean'];
  revokeRefreshTokenForUser: Scalars['Boolean'];
  register: LoginResponse;
  updateProfile: User;
  createDraft: Post;
  deletePost: Scalars['Boolean'];
  saveDraft: Post;
  savePost: Post;
  publishPost: Post;
  unpublishPost: Post;
  addTranslation: Post;
  deleteTranslation: Post;
  saveTranslationDraft: Post;
  saveTranslationPost: Post;
  publishTranslationPost: Post;
  unpublishTranslationPost: Post;
  starPost: Post;
  createAlbum: Scalars['String'];
  addPicture: AwsPhoto;
  deleteAlbum: Scalars['Boolean'];
  deletePicture: Scalars['Boolean'];
  addTag: Array<Tag>;
  removeTag: Array<Tag>;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRevokeRefreshTokenForUserArgs = {
  userId: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  input: EditProfileInput;
};


export type MutationDeletePostArgs = {
  _id: Scalars['String'];
};


export type MutationSaveDraftArgs = {
  tags: Array<Scalars['String']>;
  body: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
  language: Scalars['String'];
  _id: Scalars['String'];
};


export type MutationSavePostArgs = {
  tags: Array<Scalars['String']>;
  body: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
  language: Scalars['String'];
  _id: Scalars['String'];
};


export type MutationPublishPostArgs = {
  _id: Scalars['String'];
};


export type MutationUnpublishPostArgs = {
  _id: Scalars['String'];
};


export type MutationAddTranslationArgs = {
  language: Scalars['String'];
  _id: Scalars['String'];
};


export type MutationDeleteTranslationArgs = {
  language: Scalars['String'];
  _id: Scalars['String'];
};


export type MutationSaveTranslationDraftArgs = {
  tags: Array<Scalars['String']>;
  body: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
  language: Scalars['String'];
  _id: Scalars['String'];
};


export type MutationSaveTranslationPostArgs = {
  tags: Array<Scalars['String']>;
  body: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
  language: Scalars['String'];
  _id: Scalars['String'];
};


export type MutationPublishTranslationPostArgs = {
  language: Scalars['String'];
  _id: Scalars['String'];
};


export type MutationUnpublishTranslationPostArgs = {
  language: Scalars['String'];
  _id: Scalars['String'];
};


export type MutationStarPostArgs = {
  _id: Scalars['String'];
};


export type MutationCreateAlbumArgs = {
  albumName: Scalars['String'];
};


export type MutationAddPictureArgs = {
  albumName: Scalars['String'];
  picture: Scalars['Upload'];
};


export type MutationDeleteAlbumArgs = {
  albumName: Scalars['String'];
};


export type MutationDeletePictureArgs = {
  photoKey: Scalars['String'];
};


export type MutationAddTagArgs = {
  tag: Scalars['String'];
  localeId: Scalars['String'];
};


export type MutationRemoveTagArgs = {
  tag: Scalars['String'];
  localeId: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type EditProfileInput = {
  _id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['Float']>;
  imageUrl?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  whatsapp?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  messenger?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  description?: Maybe<Array<LocalizedDescription>>;
};

export type LocalizedDescription = {
  localeId: Scalars['String'];
  text: Scalars['String'];
};


export type GetLatestPublicPostsQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type GetLatestPublicPostsQuery = (
  { __typename?: 'Query' }
  & { getLatestPublicPosts: (
    { __typename?: 'LatestPosts' }
    & Pick<LatestPosts, 'total'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & PostFragment
    )> }
  ) }
);

export type GetPinnedPublicPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPinnedPublicPathsQuery = (
  { __typename?: 'Query' }
  & { getPinnedPublicPaths: Array<(
    { __typename?: 'PublicPath' }
    & Pick<PublicPath, '_id'>
    & { titles: Array<(
      { __typename?: 'Title' }
      & Pick<Title, 'localeId' | 'title'>
    )> }
  )> }
);

export type GetPinnedPublicPostQueryVariables = Exact<{
  _id: Scalars['String'];
}>;


export type GetPinnedPublicPostQuery = (
  { __typename?: 'Query' }
  & { getPinnedPublicPost: (
    { __typename?: 'Post' }
    & PostFragment
  ) }
);

export type GetPinnedPublicPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPinnedPublicPostsQuery = (
  { __typename?: 'Query' }
  & { getPinnedPublicPosts: Array<(
    { __typename?: 'Post' }
    & PostFragment
  )> }
);

export type GetPublicPostQueryVariables = Exact<{
  _id: Scalars['String'];
}>;


export type GetPublicPostQuery = (
  { __typename?: 'Query' }
  & { getPublicPost: (
    { __typename?: 'Post' }
    & PostFragment
  ) }
);

export type GetStaffQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStaffQuery = (
  { __typename?: 'Query' }
  & { getStaff: Array<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export type PostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, '_id' | 'starred' | 'title' | 'description' | 'body' | 'created' | 'language' | 'published' | 'updated' | 'tags'>
  & { author?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'name' | 'email'>
  )>, translations: Array<(
    { __typename?: 'PostData' }
    & Pick<PostData, 'title' | 'description' | 'body' | 'created' | 'language' | 'published' | 'updated' | 'tags'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'name' | 'email'>
    )> }
  )> }
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'email' | 'dob' | 'name' | 'imageUrl' | 'linkedin' | 'whatsapp' | 'instagram' | 'facebook' | 'messenger' | 'github' | 'twitter' | 'roles'>
  & { description?: Maybe<Array<(
    { __typename?: 'UserDescription' }
    & Pick<UserDescription, 'localeId' | 'text'>
  )>> }
);

export const PostFragmentDoc = gql`
    fragment Post on Post {
  _id
  starred
  title
  description
  body
  created
  language
  published
  updated
  tags
  author {
    _id
    name
    email
  }
  translations {
    title
    description
    body
    created
    language
    published
    updated
    tags
    author {
      _id
      name
      email
    }
  }
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  _id
  email
  dob
  name
  imageUrl
  linkedin
  whatsapp
  instagram
  facebook
  messenger
  github
  twitter
  description {
    localeId
    text
  }
  roles
}
    `;
export const GetLatestPublicPostsDocument = gql`
    query GetLatestPublicPosts($skip: Float!, $take: Float!) {
  getLatestPublicPosts(skip: $skip, take: $take) {
    posts {
      ...Post
    }
    total
  }
}
    ${PostFragmentDoc}`;

/**
 * __useGetLatestPublicPostsQuery__
 *
 * To run a query within a React component, call `useGetLatestPublicPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLatestPublicPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatestPublicPostsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useGetLatestPublicPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetLatestPublicPostsQuery, GetLatestPublicPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetLatestPublicPostsQuery, GetLatestPublicPostsQueryVariables>(GetLatestPublicPostsDocument, baseOptions);
      }
export function useGetLatestPublicPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetLatestPublicPostsQuery, GetLatestPublicPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetLatestPublicPostsQuery, GetLatestPublicPostsQueryVariables>(GetLatestPublicPostsDocument, baseOptions);
        }
export type GetLatestPublicPostsQueryHookResult = ReturnType<typeof useGetLatestPublicPostsQuery>;
export type GetLatestPublicPostsLazyQueryHookResult = ReturnType<typeof useGetLatestPublicPostsLazyQuery>;
export type GetLatestPublicPostsQueryResult = ApolloReactCommon.QueryResult<GetLatestPublicPostsQuery, GetLatestPublicPostsQueryVariables>;
export const GetPinnedPublicPathsDocument = gql`
    query GetPinnedPublicPaths {
  getPinnedPublicPaths {
    _id
    titles {
      localeId
      title
    }
  }
}
    `;

/**
 * __useGetPinnedPublicPathsQuery__
 *
 * To run a query within a React component, call `useGetPinnedPublicPathsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPinnedPublicPathsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPinnedPublicPathsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPinnedPublicPathsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPinnedPublicPathsQuery, GetPinnedPublicPathsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPinnedPublicPathsQuery, GetPinnedPublicPathsQueryVariables>(GetPinnedPublicPathsDocument, baseOptions);
      }
export function useGetPinnedPublicPathsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPinnedPublicPathsQuery, GetPinnedPublicPathsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPinnedPublicPathsQuery, GetPinnedPublicPathsQueryVariables>(GetPinnedPublicPathsDocument, baseOptions);
        }
export type GetPinnedPublicPathsQueryHookResult = ReturnType<typeof useGetPinnedPublicPathsQuery>;
export type GetPinnedPublicPathsLazyQueryHookResult = ReturnType<typeof useGetPinnedPublicPathsLazyQuery>;
export type GetPinnedPublicPathsQueryResult = ApolloReactCommon.QueryResult<GetPinnedPublicPathsQuery, GetPinnedPublicPathsQueryVariables>;
export const GetPinnedPublicPostDocument = gql`
    query GetPinnedPublicPost($_id: String!) {
  getPinnedPublicPost(_id: $_id) {
    ...Post
  }
}
    ${PostFragmentDoc}`;

/**
 * __useGetPinnedPublicPostQuery__
 *
 * To run a query within a React component, call `useGetPinnedPublicPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPinnedPublicPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPinnedPublicPostQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useGetPinnedPublicPostQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPinnedPublicPostQuery, GetPinnedPublicPostQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPinnedPublicPostQuery, GetPinnedPublicPostQueryVariables>(GetPinnedPublicPostDocument, baseOptions);
      }
export function useGetPinnedPublicPostLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPinnedPublicPostQuery, GetPinnedPublicPostQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPinnedPublicPostQuery, GetPinnedPublicPostQueryVariables>(GetPinnedPublicPostDocument, baseOptions);
        }
export type GetPinnedPublicPostQueryHookResult = ReturnType<typeof useGetPinnedPublicPostQuery>;
export type GetPinnedPublicPostLazyQueryHookResult = ReturnType<typeof useGetPinnedPublicPostLazyQuery>;
export type GetPinnedPublicPostQueryResult = ApolloReactCommon.QueryResult<GetPinnedPublicPostQuery, GetPinnedPublicPostQueryVariables>;
export const GetPinnedPublicPostsDocument = gql`
    query GetPinnedPublicPosts {
  getPinnedPublicPosts {
    ...Post
  }
}
    ${PostFragmentDoc}`;

/**
 * __useGetPinnedPublicPostsQuery__
 *
 * To run a query within a React component, call `useGetPinnedPublicPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPinnedPublicPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPinnedPublicPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPinnedPublicPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPinnedPublicPostsQuery, GetPinnedPublicPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPinnedPublicPostsQuery, GetPinnedPublicPostsQueryVariables>(GetPinnedPublicPostsDocument, baseOptions);
      }
export function useGetPinnedPublicPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPinnedPublicPostsQuery, GetPinnedPublicPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPinnedPublicPostsQuery, GetPinnedPublicPostsQueryVariables>(GetPinnedPublicPostsDocument, baseOptions);
        }
export type GetPinnedPublicPostsQueryHookResult = ReturnType<typeof useGetPinnedPublicPostsQuery>;
export type GetPinnedPublicPostsLazyQueryHookResult = ReturnType<typeof useGetPinnedPublicPostsLazyQuery>;
export type GetPinnedPublicPostsQueryResult = ApolloReactCommon.QueryResult<GetPinnedPublicPostsQuery, GetPinnedPublicPostsQueryVariables>;
export const GetPublicPostDocument = gql`
    query GetPublicPost($_id: String!) {
  getPublicPost(_id: $_id) {
    ...Post
  }
}
    ${PostFragmentDoc}`;

/**
 * __useGetPublicPostQuery__
 *
 * To run a query within a React component, call `useGetPublicPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPublicPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublicPostQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useGetPublicPostQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPublicPostQuery, GetPublicPostQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPublicPostQuery, GetPublicPostQueryVariables>(GetPublicPostDocument, baseOptions);
      }
export function useGetPublicPostLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPublicPostQuery, GetPublicPostQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPublicPostQuery, GetPublicPostQueryVariables>(GetPublicPostDocument, baseOptions);
        }
export type GetPublicPostQueryHookResult = ReturnType<typeof useGetPublicPostQuery>;
export type GetPublicPostLazyQueryHookResult = ReturnType<typeof useGetPublicPostLazyQuery>;
export type GetPublicPostQueryResult = ApolloReactCommon.QueryResult<GetPublicPostQuery, GetPublicPostQueryVariables>;
export const GetStaffDocument = gql`
    query GetStaff {
  getStaff {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetStaffQuery__
 *
 * To run a query within a React component, call `useGetStaffQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStaffQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStaffQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStaffQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetStaffQuery, GetStaffQueryVariables>) {
        return ApolloReactHooks.useQuery<GetStaffQuery, GetStaffQueryVariables>(GetStaffDocument, baseOptions);
      }
export function useGetStaffLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetStaffQuery, GetStaffQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetStaffQuery, GetStaffQueryVariables>(GetStaffDocument, baseOptions);
        }
export type GetStaffQueryHookResult = ReturnType<typeof useGetStaffQuery>;
export type GetStaffLazyQueryHookResult = ReturnType<typeof useGetStaffLazyQuery>;
export type GetStaffQueryResult = ApolloReactCommon.QueryResult<GetStaffQuery, GetStaffQueryVariables>;