import cookie from 'cookie'
import type { MutationResolvers, QueryResolvers } from 'types/graphql'
import { z } from 'zod'

import { context, ForbiddenError } from '@redwoodjs/graphql-server'

import { isAuthenticated } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { decryptAndDecompressText } from 'src/lib/encoding/encoding'
import { createSolve } from 'src/services/solves/solves'
import { step } from 'src/services/steps/steps'

const SolutionData = z
  .object({
    simpleTextSolution: z.string(),
    // add more types here
  })
  .partial()
  .refine(
    (data) =>
      // add corresponding type here
      data.simpleTextSolution,
    'Invalid solution type'
  )

export const makeAttempt: MutationResolvers['makeAttempt'] = async ({
  stepId,
  data,
}) => {
  try {
    SolutionData.parse(data)

    const attempt = await db.attempt.create({
      data: {
        userId: context?.currentUser.id,
        stepId,
        data,
      },
    })

    const stepType = 'stepSimpleText'
    const solutionType = 'simpleTextSolution'

    const step = await db.step.findUnique({
      where: { id: stepId },
      select: { [stepType]: true },
    })

    const userAttempt = data[solutionType]

    if (step[stepType].solution === userAttempt) {
      await createSolve({
        input: {
          attemptId: attempt.id,
          userId: context.currentUser.id,
        },
      })
      return { success: true }
    }
  } catch (e) {
    console.log(e)
    return { success: false }
  }

  return { success: false }
}

const decryptCookie = (data: string | undefined) => {
  return data && JSON.parse(decryptAndDecompressText(data))
}

export const optionalStep: QueryResolvers['optionalStep'] = async (
  { id, puzzleId, stepNum },
  { context }
) => {
  if (!id) return

  if (!isAuthenticated()) {
    throw new ForbiddenError('must sign in')
  }

  if (stepNum === 1) return step({ id })

  const puzzleCookieName = `ik-puzzles`

  const puzzlesCompletedCypherText = cookie.parse(context.event.headers.cookie)[
    puzzleCookieName
  ]

  const puzzlesCompleted = decryptCookie(puzzlesCompletedCypherText)

  const lastSolve = puzzlesCompleted?.puzzles[puzzleId]?.steps.length

  if (stepNum > lastSolve + 1 || !lastSolve) {
    throw new ForbiddenError('Step currently not viewable.')
  }

  return step({ id })
}
