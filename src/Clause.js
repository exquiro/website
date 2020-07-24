import {Keys, Operators, Values} from './ValidClauses.js'

class Clause {
    #key
    #operator
    #value

    constructor(expr) {
        if (expr === '') {
            this.#key = '';
            this.#operator = '';
            this.#value = '';
            return;
        }
        //Remove parentheses
        expr = expr.replace(/[(|)|\s]*/g, '');
        const result = this.validateClause(expr);

        //Throw exception if clause is invalid
        if (!result) throw new Error(`Clause ${expr} is invalid!`);

        this.#key = result[0];
        this.#operator = result[1];
        this.#value = result[2];
    }

    validateClause(expr) {
        //Ensure no character other than alpha-num and <>= exists
        const invalidChar = new RegExp(/[^\w<>=]/);
        if (invalidChar.test(expr)) return false;
        
        //Split into tokens
        const tokens = expr.split(/(\W+)/);

        //If there are more/less than 3 tokens, expression is invalid
        if (tokens.length !== 3) return false;

        //If the key doesn't exist, or has an invalid operator, expression is invalid
        if (!Keys.includes(tokens[0])) return false;
        if (!Operators[tokens[0]].includes(tokens[1])) return false;

        //If the value for the given key is invalid, expression is invalid
        const validValues = Values[tokens[0]];
        if (validValues === 'integer') {
            if (isNaN(tokens[2])) return false;
            return tokens;
        } 
        else if (!validValues.includes(tokens[2])) return false;

        return tokens;
    }

    get getKey() {
        return this.#key;
    }
    
    get getOperator() {
        return this.#operator;
    }

    get getValue() {
        return this.#value;
    }
}

export default Clause;