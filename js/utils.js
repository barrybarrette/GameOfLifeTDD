function deepCopy(state) {
    const newState = [];
    for (let i = 0; i < state.length; i++) {
        const row = [];
        for (let j = 0; j < state[i].length; j++) {
            row.push(state[i][j])
        }
        newState.push(row);
    }
    return newState;
}

module.exports.deepCopy = deepCopy;
