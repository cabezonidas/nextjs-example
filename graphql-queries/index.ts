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
  getLatestPublicPosts: LatestPosts;
  getPinnedPublicPosts: Array<Post>;
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


export type QueryGetLatestPublicPostsArgs = {
  take: Scalars['Float'];
  skip: Scalars['Float'];
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


export type GetStaffQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStaffQuery = (
  { __typename?: 'Query' }
  & { getStaff: Array<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export type PublicPostsQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type PublicPostsQuery = (
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

export type PinnedPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PinnedPostsQuery = (
  { __typename?: 'Query' }
  & { getPinnedPublicPosts: Array<(
    { __typename?: 'Post' }
    & PostFragment
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
export const PublicPostsDocument = gql`
    query PublicPosts($skip: Float!, $take: Float!) {
  getLatestPublicPosts(skip: $skip, take: $take) {
    posts {
      ...Post
    }
    total
  }
}
    ${PostFragmentDoc}`;

/**
 * __usePublicPostsQuery__
 *
 * To run a query within a React component, call `usePublicPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicPostsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function usePublicPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PublicPostsQuery, PublicPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<PublicPostsQuery, PublicPostsQueryVariables>(PublicPostsDocument, baseOptions);
      }
export function usePublicPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PublicPostsQuery, PublicPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PublicPostsQuery, PublicPostsQueryVariables>(PublicPostsDocument, baseOptions);
        }
export type PublicPostsQueryHookResult = ReturnType<typeof usePublicPostsQuery>;
export type PublicPostsLazyQueryHookResult = ReturnType<typeof usePublicPostsLazyQuery>;
export type PublicPostsQueryResult = ApolloReactCommon.QueryResult<PublicPostsQuery, PublicPostsQueryVariables>;
export const PinnedPostsDocument = gql`
    query PinnedPosts {
  getPinnedPublicPosts {
    ...Post
  }
}
    ${PostFragmentDoc}`;

/**
 * __usePinnedPostsQuery__
 *
 * To run a query within a React component, call `usePinnedPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePinnedPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePinnedPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePinnedPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PinnedPostsQuery, PinnedPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<PinnedPostsQuery, PinnedPostsQueryVariables>(PinnedPostsDocument, baseOptions);
      }
export function usePinnedPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PinnedPostsQuery, PinnedPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PinnedPostsQuery, PinnedPostsQueryVariables>(PinnedPostsDocument, baseOptions);
        }
export type PinnedPostsQueryHookResult = ReturnType<typeof usePinnedPostsQuery>;
export type PinnedPostsLazyQueryHookResult = ReturnType<typeof usePinnedPostsLazyQuery>;
export type PinnedPostsQueryResult = ApolloReactCommon.QueryResult<PinnedPostsQuery, PinnedPostsQueryVariables>;