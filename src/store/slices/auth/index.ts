import { combineReducers } from '@reduxjs/toolkit'
import session, { SessionState } from './sessionSlice'
import user, { UserState } from './userSlice'
import currentPlan, { CurrentPlanState } from './currentPlanSlice'

const reducer = combineReducers({
    session,
    user,
    currentPlan,
})

export type AuthState = {
    session: SessionState
    user: UserState
    currentPlan: CurrentPlanState
}

export * from './sessionSlice'
export * from './userSlice'
export * from './currentPlanSlice'

export default reducer
