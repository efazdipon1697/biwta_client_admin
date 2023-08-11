export const changeAppTab = (appTabName) => {
    return {
        type: "CHANGE_APP_TAB",
        payload: appTabName,
    }
}

export const changeResourceTab = (resourceTabName) => {
    return {
        type: "CHANGE_RESOURCE_TAB",
        payload: resourceTabName,
    }
}