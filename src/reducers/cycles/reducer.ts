import { produce } from 'immer'

import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycledId: string | null
}

export function CyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE: {
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycledId = action.payload.newCycle.id
      })
    }
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCyclesIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycledId
      })

      if (currentCyclesIndex < 0) {
        return state
      }
      return produce(state, (draft) => {
        draft.activeCycledId = null
        draft.cycles[currentCyclesIndex].interruptedDate = new Date()
      })
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCyclesIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycledId
      })

      if (currentCyclesIndex < 0) {
        return state
      }
      return produce(state, (draft) => {
        draft.activeCycledId = null
        draft.cycles[currentCyclesIndex].finishedDate = new Date()
      })
    }
    default:
      return state
  }
}
