const initialTab = "Admin";

const changeAppTab = (state = initialTab, action) => {
    switch (action.type) {
        case "CHANGE_APP_TAB": {
            return action.payload;
        }
        default: return state;
    }
}

export default changeAppTab;