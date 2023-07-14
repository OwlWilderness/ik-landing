import { useRef, useEffect, useState } from 'react'

import { DevTool } from '@hookform/devtools'

import {
  Form,
  useForm,
  Label,
  TextField,
  TextAreaField,
  CheckboxField,
  SelectField,
  Submit,
  useFieldArray,
  useWatch,
  Control,
} from '@redwoodjs/forms'

type Nft = {
  tokenId: string
  contractName: string
  nftData: string
  cloudinaryId: string
}

type Step = {
  failMessage: string
  successMessage: string
  challenge: string
  resourceLinks: string
  stepSortWeight: string
  solution?: string // this would really go in "type stepSimpleText"
  nftCheck?: string // this would really go in "type stepNftCheck"
}

// // in order to render the 'Step Type' just like we render the 'Step'
// type stepType = {
//   simpleText: string
//   nftCheck: string
//   functionCall: string
//   comethApi: string
//   tokenIdRange: string
//   oriumApi: string
// }

// // in order to render the 'Step Type' > 'Step Simple Text' just like we render the 'Step'
// type stepSimpleText = {
//   solution: string
// }

// // ...and so on...this feels like a lot of work for showing unique text fields
// type stepNftCheck = {
//   contractAddress: string
//   chainId: string
//   tokenId: string
//   poapEventId: string
// }

// type stepFunctionCall = {
//   methodIds: string
//   contractAddress: string
// }

// type tokenIdRange = {
//   contractAddress: string
//   chainId: string
//   startId: string
//   oriumApi: string
// }

type PuzzleFormType = {
  name: string
  slug: string
  explanation: string
  successMessage: string
  listPublicly: boolean
  parentId: string
  sortWeight: number
  nftsArray: Nft[]
  stepsArray: Step[]
}

const nftsFieldArrayName = 'nftsArray'
const stepsFieldArrayName = 'stepsArray'

const DisplayNFT = ({
  control,
  index,
}: {
  control: Control<PuzzleFormType>
  index: number
}) => {
  const data = useWatch({
    control,
    name: `${nftsFieldArrayName}.${index}`,
  })

  if (!data?.tokenId) return null

  return (
    <div className="my-4 border-2 border-zinc-500 bg-gray-100 p-4">
      <h3 className="font-bold italic">NFT Currently in State:</h3>
      <div className="font-bold">Token id: {data?.tokenId}</div>
      <div className="font-bold">Contract name: {data?.contractName}</div>
      <div className="font-bold">Data: {data?.nftData}</div>
      <div className="font-bold">Cloudinary Id: {data?.cloudinaryId}</div>
    </div>
  )
}

const DisplayStep = ({
  control,
  index,
}: {
  control: Control<PuzzleFormType>
  index: number
}) => {
  const data = useWatch({
    control,
    name: `${stepsFieldArrayName}.${index}`,
  })

  if (!data?.failMessage) return null

  return (
    <div className="my-4 border-2 border-zinc-500 bg-gray-100 p-4">
      <h3 className="font-bold italic">NFT Currently in State:</h3>
      <div className="font-bold">Fail message: {data?.failMessage}</div>
      <div className="font-bold">Success message: {data?.successMessage}</div>
      <div className="font-bold">Challenge: {data?.challenge}</div>
      <div className="font-bold">Step sort weight: {data?.stepSortWeight}</div>
      {data?.solution && (
        <div className="font-bold">Solution: {data?.solution}</div>
      )}
      {/* this won't work because the NFT check has children */}
      {/* {data?.nftCheck && (
        <div className="font-bold">NFT Check: {data?. ...WTF goes here...}</div>
      )} */}
    </div>
  )
}

const DisplayStepType = ({
  control,
  index,
}: {
  control: Control<PuzzleFormType>
  index: number
}) => {
  const data = useWatch({
    control,
    name: `${stepsFieldArrayName}.${index}`,
  })

  if (!data?.failMessage) return null
  return (
    <div>
      <div>This is the result of selecting a step type</div>
    </div>
  )
}

const EditNFT = ({
  updateNft,
  index,
  value,
  control,
}: {
  updateNft: (index: number, data: Nft) => void
  index: number
  value: Nft
  control: Control<PuzzleFormType>
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: value,
  })

  const formMethods = useForm()

  const onSubmit = () => {
    formMethods.reset()
  }
  return (
    <div className="my-4 max-w-3xl border-2 border-zinc-500 bg-zinc-300 p-4">
      {process.env.NODE_ENV === 'development' && (
        <DevTool control={formMethods.control} />
      )}
      <Form formMethods={formMethods} onSubmit={onSubmit}>
        <div>
          <DisplayNFT control={control} index={index} />
        </div>
        <Label
          name="tokenId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Token Id
        </Label>
        <TextField
          className="w-full"
          placeholder="Token Id"
          {...register(`tokenId`, { required: true })}
        />
        <Label
          name="contractName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Contract Name
        </Label>
        <TextField
          className="w-full"
          placeholder="Contract Name"
          {...register(`contractName`, { required: true })}
        />
        <Label
          name="nftData"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Data
        </Label>
        <TextAreaField
          className="w-full"
          placeholder="Data"
          {...register(`nftData`, { required: true })}
        />
        <Label
          name="cloudinaryId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Cloudinary Id
        </Label>
        <TextField
          className="w-full"
          placeholder="Cloudinary Id"
          {...register(`cloudinaryId`, { required: true })}
        />
        <Submit
          className="rw-button-group rw-button rw-button-blue"
          onClick={handleSubmit((data) => {
            updateNft(index, data)
          })}
        >
          Add NFT to State
        </Submit>
      </Form>
    </div>
  )
}

const EditStep = ({
  updateStep,
  index,
  value,
  control,
}: {
  updateStep: (index: number, data: Step) => void
  index: number
  value: Step
  control: Control<PuzzleFormType>
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: value,
  })

  const [stepType, setStepType] = useState('')

  const formMethods = useForm()

  const onSubmit = () => {
    // nothing happens right now when the form is submitted
    // formMethods.reset()
  }

  return (
    <div className="my-4 max-w-3xl border-2 border-zinc-500 bg-zinc-300 p-4">
      {process.env.NODE_ENV === 'development' && (
        <DevTool control={formMethods.control} />
      )}
      <Form formMethods={formMethods} onSubmit={onSubmit}>
        <div>
          <DisplayStep control={control} index={index} />
        </div>
        <Label
          name="failMessage"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Fail message
        </Label>
        <TextField
          className="w-full"
          placeholder="Fail message"
          {...register(`failMessage`, { required: true })}
        />
        <Label
          name="successMessage"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Success message
        </Label>
        <TextField
          className="w-full"
          placeholder="Success message"
          {...register(`successMessage`, { required: true })}
        />
        <Label
          name="challenge"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Challenge
        </Label>
        <TextAreaField
          className="w-full"
          placeholder="Challenge"
          {...register(`challenge`, { required: true })}
        />
        <Label
          name="resourceLinks"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Resource links
        </Label>
        <TextField
          className="w-full"
          placeholder="Resource links"
          {...register(`resourceLinks`, { required: true })}
        />
        <Label
          name="stepSortWeight"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Step sort weight
        </Label>
        <TextField
          className="w-full"
          placeholder="Step sort weight"
          {...register(`stepSortWeight`, { required: true })}
        />
        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Step Type
        </Label>
        <div className="rw-check-radio-items">
          <SelectField
            name="type"
            defaultValue={stepType}
            onChange={(event) => setStepType(event.target.value)}
          >
            <option disabled value="">
              Select a step type
            </option>
            <option value="SIMPLE_TEXT">Simple Text</option>
            <option value="NFT_CHECK">NFT Check</option>
          </SelectField>
        </div>

        <DisplayStepType control={control} index={index} />

        {stepType === 'SIMPLE_TEXT' && (
          <div className="simple-text">
            <div className="solution">
              <Label
                name="solution"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Solution
              </Label>
              <TextField
                className="w-full"
                placeholder="Solutuion"
                {...register(`solution`, { required: true })}
              />
            </div>
          </div>
        )}
        {stepType === 'NFT_CHECK' ? (
          <div className="nft-check">
            <div className="contract-address">
              <Label
                name="contractAddress"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Contract Address
              </Label>
              <TextField
                name="contractAddress"
                className="w-full"
                placeholder="Contract Address"
              />
            </div>
            <div className="chain-id">
              <Label name="chainId" className="rw-label">
                Chain Id
              </Label>
              <TextField
                name="chainId"
                className="w-full"
                placeholder="Chain Id"
              />
            </div>
            <div className="token-id">
              <Label name="tokenId" className="rw-label">
                Token Id
              </Label>
              <TextField
                name="tokenId"
                className="w-full"
                placeholder="Token Id"
              />
            </div>
            <div className="poap-event-id">
              <Label name="poapEventId" className="rw-label">
                Poap Event Id
              </Label>
              <TextField
                name="poapEventId"
                className="w-full"
                placeholder="Poap Event Id"
              />
            </div>
          </div>
        ) : null}
        <Submit
          className="rw-button-group rw-button rw-button-blue"
          onClick={handleSubmit((data) => {
            updateStep(index, data)
          })}
        >
          Add Step to State
        </Submit>
      </Form>
    </div>
  )
}

export default function PuzzleForm() {
  const formMethods = useForm<PuzzleFormType>({
    defaultValues: {
      [nftsFieldArrayName]: [],
      [stepsFieldArrayName]: [],
    },
  })
  const {
    fields: nftFields,
    append: appendNft,
    update: updateNft,
    remove: removeNft,
  } = useFieldArray({
    control: formMethods.control,
    name: nftsFieldArrayName,
  })

  const {
    fields: stepFields,
    append: appendStep,
    update: updateStep,
    remove: removeStep,
  } = useFieldArray({
    control: formMethods.control,
    name: stepsFieldArrayName,
  })
  // console.log(formMethods.getValues())

  const renderCount = useRef(1)

  const onSubmit = (data: PuzzleFormType) => {
    console.log(data)
  }

  useEffect(() => {
    {
      process.env.NODE_ENV === 'development' &&
        (renderCount.current = renderCount.current + 1)
    }
  })

  return (
    <div>
      <div className="m-4 inline-block bg-pink-200 p-2 text-lg text-red-800">
        Times this component has rendered: <b>{renderCount.current}</b>
      </div>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Welcome to the Puzzle Creation Form
          </h2>
        </header>
        <div className="rw-segment-main text-gray-500">
          <div>
            {process.env.NODE_ENV === 'development' && (
              <DevTool control={formMethods.control} />
            )}
            <Form formMethods={formMethods} onSubmit={onSubmit}>
              <div className="max-w-3xl">
                <h2 className="my-8 text-4xl font-bold">Create a Puzzle</h2>
                <Label
                  name="name"
                  className="rw-label"
                  errorClassName="rw-label rw-label-error"
                >
                  Name
                </Label>

                <TextField
                  name="name"
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                  validation={{ required: true }}
                />

                <Label
                  name="slug"
                  className="rw-label"
                  errorClassName="rw-label rw-label-error"
                >
                  Slug
                </Label>

                <TextField
                  name="slug"
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                  validation={{ required: true }}
                />

                <Label
                  name="explanation"
                  className="rw-label"
                  errorClassName="rw-label rw-label-error"
                >
                  Explanation
                </Label>

                <TextField
                  name="explanation"
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                  validation={{ required: true }}
                />

                <Label
                  name="successMessage"
                  className="rw-label"
                  errorClassName="rw-label rw-label-error"
                >
                  Success message
                </Label>

                <TextField
                  name="successMessage"
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                  validation={{ required: true }}
                />

                <Label
                  name="listPublicly"
                  className="rw-label"
                  errorClassName="rw-label rw-label-error"
                >
                  List publicly
                </Label>

                <CheckboxField name="listPublicly" className="rw-input" />

                <Label
                  name="parentId"
                  className="rw-label"
                  errorClassName="rw-label rw-label-error"
                >
                  Parent Id
                </Label>

                <TextField
                  name="parentId"
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                  validation={{ required: true }}
                />

                <Label
                  name="sortWeight"
                  className="rw-label"
                  errorClassName="rw-label rw-label-error"
                >
                  Sort Weight
                </Label>

                <TextField
                  name="sortWeight"
                  className="rw-input w-14"
                  errorClassName="rw-input rw-input-error"
                  validation={{ required: true }}
                />
              </div>

              {nftFields.map((field, index) => (
                <fieldset key={field.id}>
                  <EditNFT
                    control={formMethods.control}
                    updateNft={updateNft}
                    index={index}
                    value={field}
                  />
                  <button
                    className="rw-button-group rw-button rw-button-blue"
                    type="button"
                    onClick={() => removeNft(index)}
                  >
                    Remove
                  </button>
                </fieldset>
              ))}

              <div className="rw-button-group">
                <button
                  type="button"
                  className="rw-button rw-button-blue"
                  onClick={() => {
                    appendNft({
                      tokenId: '',
                      contractName: '',
                      nftData: '',
                      cloudinaryId: '',
                    })
                  }}
                >
                  Add NFT
                </button>
              </div>
              {stepFields.map((field, index) => (
                <fieldset key={field.id}>
                  <EditStep
                    control={formMethods.control}
                    updateStep={updateStep}
                    index={index}
                    value={field}
                  />
                  <button
                    className="rw-button-group rw-button rw-button-blue"
                    type="button"
                    onClick={() => removeStep(index)}
                  >
                    Remove
                  </button>
                </fieldset>
              ))}

              <div className="rw-button-group">
                <button
                  type="button"
                  className="rw-button rw-button-blue"
                  onClick={() => {
                    appendStep({
                      failMessage: '',
                      successMessage: '',
                      challenge: '',
                      resourceLinks: '',
                      stepSortWeight: '',
                      solution: '',
                    })
                  }}
                >
                  Add Step
                </button>
              </div>
              <div className="rw-button-group">
                <Submit className="rw-button-group rw-button rw-button-blue">
                  Save Puzzle to Database
                </Submit>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
