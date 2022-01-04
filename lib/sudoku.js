/*
    81 cells total
    two cells in 1 byte
    41 bytes for the whole board

    41 bytes for game board
    41 bytes for solution
    -----------
    82 bytes


    81 bits for given mask
    round up to 88 to be divisible into bytes
    11 bytes for given mask
    11 bytes for blank mask
    -------
    104 bytes


    Previous: 162 bytes
*/

const SudokuGen = require('sudoku-gen')

const BOARD_OFFSET = 0;
const SOLUTION_OFFSET = 41;
const GIVEN_OFFSET = 82;
const BLANK_OFFSET = 93;
   
class Puzzle {
    constructor() {
        this.board = new Uint8Array(81);
        this.solution = new Uint8Array(81);
        this.given = new Uint8Array(81); // This could be a BigInt, but express can't parse BigInt to JSON
        this.blank = new Uint8Array(81);
    }

    genPuzzle(difficulty) {
        let genPuzzle = SudokuGen.getSudoku(difficulty);

        for(let index = 0; index < 81; index++) {
            let cellValue = genPuzzle.puzzle[index];

            // The data from SudokuGen is either a number or a -
            // Since 0 is a valid value, there needs to be a different
            // value to represent a blank cell. 
            if(cellValue === '-') {
                this.board[index] = 0;
                this.blank[index] = 1;
            } else {
                this.board[index] = parseInt(cellValue);
                this.given[index] = 1;
                this.blank[index] = 0;
            }
            this.solution[index] = parseInt(genPuzzle.solution[index]);
        }
    }

    // Compacts two cells into 1 byte
    _compact(cellA, cellB) {
        // 255 represents a blank cell
        // 255 can't be stored in 4 bits, so we change it to 0
        if(cellA === 255) cellA = 0;
        if(cellB === 255) cellB = 0;

        return (cellA & 0xF) | ((cellB & 0xF) << 4);
    }

    // Returns compressed data to be put into the database    
    compress() {
        let data = new Uint8Array(104);
        
        let destIndex = 0;
        for(let index = 0; index < 81; index += 2) {
            let cellA = this.board[index+0];
            let cellB = this.board[index+1];
            let comp = this._compact(cellA, cellB);
            //console.log(`${index}:${index+1}: Compacting ${cellA.toString(2)} and ${(cellB || 0).toString(2)} to ${comp.toString(2)}`);
            data[destIndex] = this._compact(cellA, cellB);

            let solutionCellA = this.solution[index+0];
            let solutionCellB = this.solution[index+1]
            data[SOLUTION_OFFSET + destIndex] = this._compact(solutionCellA, solutionCellB);

            destIndex += 1;
        }


        // compress the given mask
        for(let index = 0; index < 11; index++) {
            let givenValue = 0;
            let blankValue = 0;
            for(let bitIndex = 0; bitIndex < 8; bitIndex++) {
                givenValue |= (this.given[(index * 8) + bitIndex] & 0x1) << bitIndex;
                blankValue |= (this.blank[(index * 8) + bitIndex] & 0x1) << bitIndex;

            }
            data[GIVEN_OFFSET + index] = givenValue;
            data[BLANK_OFFSET + index] = blankValue;

            //console.log(`${index}:${index*8} - Comp given ${data[GIVEN_OFFSET + index].toString(2)}`);
        }

        return data;
    }

    // Decompresses the data from the database
    decompress(data) {
        // Parse the mask that says which cells were given
        for(let index = 0; index < 11; index++) {
            for(let bitIndex = 0; bitIndex < 8; bitIndex++) {
                if(index===10 && bitIndex >= 4) break;
                let value = data[GIVEN_OFFSET + (index)];
                //console.log(`${(index*8)} - ${value.toString(2)}`);
                this.given[(index * 8) + bitIndex] = (value >> bitIndex) & 0x1;

                value = data[BLANK_OFFSET + (index)];
                //console.log(`${(index*8)} - ${value.toString(2)}`);
                this.blank[(index * 8) + bitIndex] = (value >> bitIndex) & 0x1;

            }
        }

        // Parse the game board and the solution
        let srcIndex = 0;
        for(let index = 0; index < 81; index += 2) {
                     
            // decompress game board
            let value = data[srcIndex];
            let cellA = (value & 0xF);
            let cellB = ((value >> 4) & 0xF);

            //console.log(`DEcomp ${value.toString(2)} to ${cellA.toString(2)} and ${cellB.toString(2)}`);
            this.board[index + 0] = cellA;
            this.board[index + 1] = cellB;

            // decompress solution
            value = this.solution[srcIndex];
            cellA = (value & 0xF);
            cellB = ((value >> 4) & 0xF);
            this.solution[index + 0] = cellA;
            this.solution[index + 1] = cellB;
            

            srcIndex += 1;
        }
        
    }
}

const createNewPuzzle = (difficulty) => {
    let newPuzzle = new Puzzle();
    newPuzzle.genPuzzle(difficulty);
    return newPuzzle;
}

const createFromDB = (data) => {
    let newPuzzle = new Puzzle();
    newPuzzle.decompress(data);
    return newPuzzle;
}

module.exports = {
    createNewPuzzle: createNewPuzzle,
    createFromDB: createFromDB
}


