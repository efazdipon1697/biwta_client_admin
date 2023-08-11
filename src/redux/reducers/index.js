import { combineReducers } from "redux";
import changeAppTab from "./change_tab";
import changeResourceTab from "./change_resources_tab";

const rootReducer = combineReducers({
    changeAppTab,
    changeResourceTab
})

export default rootReducer;