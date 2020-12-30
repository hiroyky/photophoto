import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
};

/** Basic */
export type Node = {
  id: Scalars['ID'];
};

export type Connection = {
  pageInfo: PageInfo;
  edges: Array<Maybe<Edge>>;
  nodes: Array<Maybe<Node>>;
};

export type Edge = {
  cursor: Scalars['String'];
  node: Node;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
};


export enum SortOrder {
  Ascending = 'ascending',
  Descending = 'descending'
}

/** PhotoFile */
export type PhotoFile = Node & {
  __typename?: 'PhotoFile';
  id: Scalars['ID'];
  filePath: Scalars['String'];
  fileSize: Scalars['Float'];
  fileName: Scalars['String'];
  fileType: Scalars['String'];
  fileHash: Scalars['String'];
  metadata?: Maybe<PhotoMetadata>;
};

export type PhotoFileEdge = Edge & {
  __typename?: 'PhotoFileEdge';
  cursor: Scalars['String'];
  node: PhotoFile;
};

export type PhotoFileConnection = Connection & {
  __typename?: 'PhotoFileConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<PhotoFileEdge>>;
  nodes: Array<Maybe<PhotoFile>>;
};

/** PhotoMetadata */
export type PhotoMetadata = Node & {
  __typename?: 'PhotoMetadata';
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  photoFile?: Maybe<PhotoFile>;
  photoFiles: PhotoFileConnection;
};


export type QueryPhotoFileArgs = {
  id: Scalars['ID'];
};


export type QueryPhotoFilesArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  sortBy?: Maybe<Scalars['String']>;
  sortOrder?: Maybe<SortOrder>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Node: ResolversTypes['PhotoFile'] | ResolversTypes['PhotoMetadata'];
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Connection: ResolversTypes['PhotoFileConnection'];
  Edge: ResolversTypes['PhotoFileEdge'];
  String: ResolverTypeWrapper<Scalars['String']>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Time: ResolverTypeWrapper<Scalars['Time']>;
  SortOrder: SortOrder;
  PhotoFile: ResolverTypeWrapper<PhotoFile>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  PhotoFileEdge: ResolverTypeWrapper<PhotoFileEdge>;
  PhotoFileConnection: ResolverTypeWrapper<PhotoFileConnection>;
  PhotoMetadata: ResolverTypeWrapper<PhotoMetadata>;
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Node: ResolversParentTypes['PhotoFile'] | ResolversParentTypes['PhotoMetadata'];
  ID: Scalars['ID'];
  Connection: ResolversParentTypes['PhotoFileConnection'];
  Edge: ResolversParentTypes['PhotoFileEdge'];
  String: Scalars['String'];
  PageInfo: PageInfo;
  Boolean: Scalars['Boolean'];
  Time: Scalars['Time'];
  PhotoFile: PhotoFile;
  Float: Scalars['Float'];
  PhotoFileEdge: PhotoFileEdge;
  PhotoFileConnection: PhotoFileConnection;
  PhotoMetadata: PhotoMetadata;
  Query: {};
  Int: Scalars['Int'];
}>;

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = ResolversObject<{
  __resolveType: TypeResolveFn<'PhotoFile' | 'PhotoMetadata', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
}>;

export type ConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Connection'] = ResolversParentTypes['Connection']> = ResolversObject<{
  __resolveType: TypeResolveFn<'PhotoFileConnection', ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<Maybe<ResolversTypes['Edge']>>, ParentType, ContextType>;
  nodes?: Resolver<Array<Maybe<ResolversTypes['Node']>>, ParentType, ContextType>;
}>;

export type EdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Edge'] = ResolversParentTypes['Edge']> = ResolversObject<{
  __resolveType: TypeResolveFn<'PhotoFileEdge', ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Node'], ParentType, ContextType>;
}>;

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export type PhotoFileResolvers<ContextType = any, ParentType extends ResolversParentTypes['PhotoFile'] = ResolversParentTypes['PhotoFile']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  filePath?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fileSize?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  fileName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fileType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fileHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['PhotoMetadata']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PhotoFileEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PhotoFileEdge'] = ResolversParentTypes['PhotoFileEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['PhotoFile'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PhotoFileConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PhotoFileConnection'] = ResolversParentTypes['PhotoFileConnection']> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<Maybe<ResolversTypes['PhotoFileEdge']>>, ParentType, ContextType>;
  nodes?: Resolver<Array<Maybe<ResolversTypes['PhotoFile']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PhotoMetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['PhotoMetadata'] = ResolversParentTypes['PhotoMetadata']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  photoFile?: Resolver<Maybe<ResolversTypes['PhotoFile']>, ParentType, ContextType, RequireFields<QueryPhotoFileArgs, 'id'>>;
  photoFiles?: Resolver<ResolversTypes['PhotoFileConnection'], ParentType, ContextType, RequireFields<QueryPhotoFilesArgs, never>>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Node?: NodeResolvers<ContextType>;
  Connection?: ConnectionResolvers<ContextType>;
  Edge?: EdgeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Time?: GraphQLScalarType;
  PhotoFile?: PhotoFileResolvers<ContextType>;
  PhotoFileEdge?: PhotoFileEdgeResolvers<ContextType>;
  PhotoFileConnection?: PhotoFileConnectionResolvers<ContextType>;
  PhotoMetadata?: PhotoMetadataResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
