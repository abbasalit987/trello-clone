export const ACTIONS = {
    SET_BOARDS: "set-boards",
    ADD_BOARD: "add-board",
    SET_LISTS: "set-lists",
    ADD_LISTS: "add-lists",
    SET_TASK_CARD_INFO: "set-task-card-info",
    ADD_TASK_CARD_INFO: "add-task-card-info",
    SET_CHECKLISTS: "set-checklists",
    ADD_CHECKLISTS: "add-checklists",
}

export const initialState = {
    boards: [],
    lists: [],
    taskCardInfo: [],
    checkList: [],
}

export const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_BOARDS: {
            return { ...state, boards: action.payload }
        }
        case ACTIONS.ADD_BOARD: {
            return { ...state, boards: [...state.boards, action.payload] }
        }
        case ACTIONS.SET_LISTS: {
            return { ...state, lists: action.payload }
        }
        case ACTIONS.ADD_LISTS: {
            return { ...state, lists: [...state.lists, action.payload] }
        }
        case ACTIONS.SET_TASK_CARD_INFO: {
            return { ...state, taskCardInfo: action.payload }
        }
        case ACTIONS.ADD_TASK_CARD_INFO: {
            return {
                ...state,
                taskCardInfo: [...state.taskCardInfo, action.payload],
            }
        }
        case ACTIONS.SET_CHECKLISTS: {
            return { ...state, checkList: action.payload }
        }
        case ACTIONS.ADD_CHECKLISTS: {
            return { ...state, checkList: [...state.checkList, action.payload] }
        }
        default:
            return state
    }
}
