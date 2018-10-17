// object containing sorting functions for the todo array

const SortFuncs = {
    time: {
        descending: (a, b) => {
            // this function subtracts the pure integer value of the Date objects within the two
            // Todos being compared
            return b.created.valueOf() - a.created.valueOf();
        },
        ascending: (a, b) => {
            return a.created.valueOf() - b.created.valueOf();
        }
    }
};

export default SortFuncs;