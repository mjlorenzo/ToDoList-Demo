// object containing sorting functions for the todo array

const CREATED_FIELD = "created";

const SortFuncs = {
    time: {
        ascending: (a, b) => {
            return a.created.getTime() - b.created.getTime();
        },
        descending: (a, b) => {
            return b.created.getTime() - a.created.getTime();
        }
    }
};

export default SortFuncs;