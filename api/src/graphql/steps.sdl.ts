export const schema = gql`
  type Step {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    failMessage: String
    successMessage: String
    challenge: String
    resourceLinks: String
    stepSortWeight: Int!
    puzzle: Puzzle!
    puzzleId: String!
    type: StepType!
    stepSimpleText: StepSimpleText
    stepNftCheck: StepNftCheck
    stepFunctionCall: StepFunctionCall
    stepComethApi: StepComethApi
    stepOriumApi: StepOriumApi
    stepLensApi: StepLensApi
    stepTokenIdRange: StepTokenIdRange
    stepAssetTransfer: StepAssetTransfer
    stepErc20Balance: StepErc20Balance
    migrateLandingRoute: String
    attempts: [Attempt]!
    hasUserCompletedStep: Boolean
    hasAnonUserCompletedStep: Boolean
  }

  enum StepType {
    SIMPLE_TEXT
    NFT_CHECK
    FUNCTION_CALL
    COMETH_API
    TOKEN_ID_RANGE
    ORIUM_API
    LENS_API
    ASSET_TRANSFER
    ERC20_BALANCE
  }

  type Query {
    steps: [Step!]! @skipAuth
    step(id: String!): Step @requireAuth
  }

  input CreateStepInput {
    failMessage: String
    successMessage: String
    challenge: String
    resourceLinks: String
    stepSortWeight: Int!
    puzzleId: String!
    type: StepType!
    migrateLandingRoute: String
    # Manually added
    stepSimpleText: CreateStepSimpleTextInput
    stepNftCheck: CreateStepNftCheckInput
    stepFunctionCall: CreateStepFunctionCallInput
    stepComethApi: CreateStepComethApiInput
    stepTokenIdRange: CreateStepTokenIdRangeInput
    stepOriumApi: CreateStepOriumApiInput
  }

  input UpdateStepInput {
    failMessage: String
    successMessage: String
    challenge: String
    resourceLinks: String
    stepSortWeight: Int
    puzzleId: String
    type: StepType
    migrateLandingRoute: String
  }

  type Mutation {
    createStep(input: CreateStepInput!): Step! @requireAuth(roles: ["ADMIN"])
    updateStep(id: String!, input: UpdateStepInput!): Step!
      @requireAuth(roles: ["ADMIN"])
    deleteStep(id: String!): Step! @requireAuth(roles: ["ADMIN"])
  }
`
