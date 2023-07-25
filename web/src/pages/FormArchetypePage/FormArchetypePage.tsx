// This page is temporary, just to test out the form
// BROWSER LOCATION: http://localhost:8910/puzzle/archetype

// only used in dev mode
let useEffect: typeof import('react').useEffect
let useRef: typeof import('react').useRef

// only used in dev mode
if (process.env.NODE_ENV === 'development') {
  ;({ useRef, useEffect } = require('react'))
}

import { DevTool } from '@hookform/devtools'

import {
  Form,
  useForm,
  Label,
  SelectField,
  Submit,
  TextField,
  NumberField,
  useFieldArray,
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
  UseFormGetValues,
  CheckboxField,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

const CREATE_BURD_PUZZLE_MUTATION = gql`
  mutation BurdArchetypalPuzzleCreation($input: CreateBurdPuzzleInput!) {
    createBurdPuzzle(input: $input) {
      success
    }
  }
`

const stepsArrayName = 'stepsArray'

// const startingSteps: Step[] = [{ message: 'step 1' }, { message: 'step 2' }]
const startingSteps: Step[] = []

type StepType = 'SIMPLE_TEXT' | 'NFT_CHECK' | 'UNCHOSEN'

type Step = {
  failMessage: string
  successMessage: string
  challenge: string
  resourceLinks: string
  stepSortWeight: number
  type: StepType
}

type StepSimpleText = Step & {
  type: 'SIMPLE_TEXT'
  solution: string
}

type StepNftCheck = Step & {
  type: 'NFT_CHECK'
  nftId: string
}

function Step({
  index,
  register,
  watch,
  setValue,
  getValues,
}: {
  index: number
  register: UseFormRegister<PuzzleFormType>
  watch: UseFormWatch<PuzzleFormType>
  setValue: UseFormSetValue<PuzzleFormType>
  getValues: UseFormGetValues<PuzzleFormType>
}) {
  // Watch for select val changing
  const stepTypeVal = watch(`${stepsArrayName}.${index}.type`)

  useEffect(() => {
    if (stepTypeVal === 'SIMPLE_TEXT') {
      setValue(`${stepsArrayName}.${index}`, {
        type: 'SIMPLE_TEXT',
        failMessage: getValues(`${stepsArrayName}.${index}.failMessage`),
        successMessage: getValues(`${stepsArrayName}.${index}.successMessage`),
        challenge: getValues(`${stepsArrayName}.${index}.challenge`),
        resourceLinks: getValues(`${stepsArrayName}.${index}.resourceLinks`),
        stepSortWeight: getValues(`${stepsArrayName}.${index}.stepSortWeight`),
        solution: '',
      })
    }
    if (stepTypeVal === 'NFT_CHECK') {
      setValue(`${stepsArrayName}.${index}`, {
        type: 'NFT_CHECK',
        failMessage: getValues(`${stepsArrayName}.${index}.failMessage`),
        successMessage: getValues(`${stepsArrayName}.${index}.successMessage`),
        challenge: getValues(`${stepsArrayName}.${index}.challenge`),
        resourceLinks: getValues(`${stepsArrayName}.${index}.resourceLinks`),
        stepSortWeight: getValues(`${stepsArrayName}.${index}.stepSortWeight`),
        nftId: '',
      })
    }
  }, [index, setValue, getValues, stepTypeVal])

  return (
    <fieldset className="text-stone-100">
      <Label
        name="failMesssage"
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Fail Message
      </Label>
      <TextField
        placeholder="Fail Message"
        {...register(`${stepsArrayName}.${index}.failMessage`)}
        className="block bg-inherit text-stone-100"
      />

      <Label
        name="successMessage"
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Success Message
      </Label>
      <TextField
        placeholder="Success Message"
        {...register(`${stepsArrayName}.${index}.successMessage`)}
        className="block bg-inherit text-stone-100"
      />

      <Label
        name="challenge"
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Challenge
      </Label>
      <TextField
        placeholder="Challenge"
        {...register(`${stepsArrayName}.${index}.challenge`)}
        className="block bg-inherit text-stone-100"
      />

      <Label
        name="resourceLinks"
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Resource Links
      </Label>
      <TextField
        placeholder="Challenge"
        {...register(`${stepsArrayName}.${index}.resourceLinks`)}
        className="block bg-inherit text-stone-100"
      />

      <Label
        name="stepSortWeight"
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Step Sort Weight
      </Label>
      <NumberField
        placeholder="Challenge"
        {...register(`${stepsArrayName}.${index}.stepSortWeight`)}
        className="block bg-inherit text-stone-100"
      />
      <div className="text-stone-800">
        <SelectField {...register(`${stepsArrayName}.${index}.type`)}>
          <option value="UNCHOSEN">Choose a Step Type</option>
          <option value="SIMPLE_TEXT">Simple Text</option>
          <option value="NFT_CHECK">NFT check</option>
        </SelectField>
      </div>

      {stepTypeVal === 'UNCHOSEN' && (
        <h1>
          <br></br>
        </h1>
      )}

      {stepTypeVal === 'SIMPLE_TEXT' && (
        <TextField
          placeholder="Solution"
          {...register(`${stepsArrayName}.${index}.solution`)}
          className="block bg-inherit text-stone-100"
        />
      )}

      {stepTypeVal === 'NFT_CHECK' && (
        <TextField
          placeholder="NFT ID"
          {...register(`${stepsArrayName}.${index}.nftId`)}
          className="block bg-inherit"
        />
      )}
    </fieldset>
  )
}

type PuzzleFormType = {
  name: string
  slug: string
  explanation: string
  successMessage: string
  listPublicly: boolean
  stepsArray: (StepSimpleText | StepNftCheck | Step)[]
}

export default function PuzzleForm() {
  // only used in dev mode
  const renderCount = useRef(1)
  // only used in dev mode
  useEffect(() => {
    {
      process.env.NODE_ENV === 'development' &&
        (renderCount.current = renderCount.current + 1)
    }
  })

  const formMethods = useForm<PuzzleFormType>({
    defaultValues: {
      [stepsArrayName]: startingSteps,
    },
  })

  const { fields, append } = useFieldArray({
    control: formMethods.control,
    name: stepsArrayName,
  })

  const onSubmit = async (input: PuzzleFormType) => {
    createArchetypalPuzzle({
      variables: {
        input,
      },
    })
    console.log(input)
  }

  const [createArchetypalPuzzle] = useMutation(CREATE_BURD_PUZZLE_MUTATION, {
    onCompleted: (data) => {
      console.log(data.createBurdPuzzle)
      alert(`Rewardable created`)
    },
    onError: (error) => {
      alert(`error: ${error.message}`)
    },
  })

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit}>
      <div className="m-4 inline-block bg-pink-200 p-2 text-lg text-red-800">
        Times this component has rendered: <b>{renderCount.current}</b>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <DevTool control={formMethods.control} />
      )}
      <Label
        name="name"
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Name
      </Label>
      <TextField
        name="name"
        className="block bg-inherit text-stone-100"
        placeholder="Name"
      />

      <Label
        name="slug"
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Slug
      </Label>
      <TextField
        name="slug"
        className="block bg-inherit text-stone-100"
        placeholder="Slug"
      />

      <Label
        name="explanation"
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Explanation
      </Label>
      <TextField
        name="explanation"
        className="block bg-inherit text-stone-100"
        placeholder="Explanation"
      />

      <Label
        name="successMessage"
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Success Message
      </Label>
      <TextField
        name="successMessage"
        className="block bg-inherit text-stone-100"
        placeholder="Success Message"
      />
      <Label
        name="listPublicly"
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        List Publicly
      </Label>
      <CheckboxField
        name="listPublicly"
        className="block bg-inherit text-stone-100"
      />
      <h1 className="mt-8">Steps go below this line _______________</h1>

      {fields.map((field, index) => (
        <Step
          index={index}
          register={formMethods.register}
          key={field.id}
          watch={formMethods.watch}
          setValue={formMethods.setValue}
          getValues={formMethods.getValues}
        />
      ))}

      <div className="rw-button-group">
        <button
          type="button"
          className="rw-button rw-button-blue"
          onClick={() =>
            append({
              type: 'UNCHOSEN',
              failMessage: '',
              successMessage: '',
              challenge: '',
              resourceLinks: '',
              stepSortWeight: 0,
            })
          }
        >
          Add Step
        </button>
      </div>
      <Submit>Submit</Submit>
    </Form>
  )
}

// // Console logged "data" looks like this:
// explanation : "myexplan"
// listPublicly : true
// name : "myname"
// slug : "myslug"
// stepsArray : Array(1)
//   0 :
//     type: 'SIMPLE_TEXT',
//     failMessage: 'myfail',
//     successMessage: 'musuccess',
//     challenge: 'muchall',
//     resourceLinks: 'myresourcz'
//     stepSortWeight: 'string shoulde be number'
// length : 1
// [[Prototype]] : Array(0)
// successMessage : "mypuzsuccess"
