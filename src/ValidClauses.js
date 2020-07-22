export const Keys = ["area", "semester", "coursept", "hours", "group", "essay", "visit"];

export const Values = {
    "area": ["st", "gl", "hu", "ch"],
    "semester": ["1", "2", "both"],
    "coursept": "integer",
    "hours": "integer",
    "group": ["yes", "no"],
    "essay": ["yes", "no"],
    "visit": ["yes", "no"]
};

export const Operators = {
    "area": ["="],
    "semester": ["="],
    "coursept": ["=", "<", ">", "<=", ">="],
    "hours": ["=", "<", ">", "<=", ">="],
    "group": ["="],
    "essay": ["="],
    "visit": ["="]
};