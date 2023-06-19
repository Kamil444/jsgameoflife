import { Component, OnInit } from '@angular/core';
import { BoardService } from './board.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  // private boardDimension = {
  //   rows: 30,
  //   cols: 30,
  // };
  public game$: Observable<any>;
  // public board: number[][];
  // private nextGenBoard: number[][];
  constructor(private boardService: BoardService) {
    this.game$ = this.boardService.gameBoard$;
    // this.board = this.createBoard(
    //   this.boardDimension.rows,
    //   this.boardDimension.cols
    // );
    // this.nextGenBoard = this.createBoard(
    //   this.boardDimension.rows,
    //   this.boardDimension.cols
    // );
    // this.populateBoard(this.board);
  }

  ngOnInit(): void {}

  // private createBoard(rows: number, cols: number) {
  //   let board = new Array(rows);

  //   for (let i = 0; i < cols; i++) {
  //     board[i] = new Array(cols);
  //   }

  //   return board;
  // }

  // private populateBoard(board: number[][]) {
  //   const rows = this.boardDimension.rows;
  //   const cols = this.boardDimension.cols;
  //   for (let i = 0; i < rows; i++) {
  //     for (let j = 0; j < cols; j++) {
  //       board[i][j] = Math.random() > 0.5 ? 1 : 0;
  //     }
  //   }
  // }

  // private nextGen() {
  //   const rows = this.boardDimension.rows;
  //   const cols = this.boardDimension.cols;
  //   for (let i = 0; i < rows; i++) {
  //     for (let j = 0; j < cols; j++) {
  //       this.gameRules(i, j);
  //     }
  //   }
  //   this.copyAndResetBoard();
  // }

  // private checkForNeighbors(row: number, col: number) {
  //   const rows = this.boardDimension.rows;
  //   const cols = this.boardDimension.cols;
  //   let count = 0;
  //   if (row - 1 >= 0) {
  //     if (this.board[row - 1][col] == 1) count++;
  //   }
  //   if (row - 1 >= 0 && col - 1 >= 0) {
  //     if (this.board[row - 1][col - 1] == 1) count++;
  //   }
  //   if (row - 1 >= 0 && col + 1 < cols) {
  //     if (this.board[row - 1][col + 1] == 1) count++;
  //   }
  //   if (col - 1 >= 0) {
  //     if (this.board[row][col - 1] == 1) count++;
  //   }
  //   if (col + 1 < cols) {
  //     if (this.board[row][col + 1] == 1) count++;
  //   }
  //   if (row + 1 < rows) {
  //     if (this.board[row + 1][col] == 1) count++;
  //   }
  //   if (row + 1 < rows && col - 1 >= 0) {
  //     if (this.board[row + 1][col - 1] == 1) count++;
  //   }
  //   if (row + 1 < rows && col + 1 < cols) {
  //     if (this.board[row + 1][col + 1] == 1) count++;
  //   }
  //   return count;
  // }

  // private copyAndResetBoard() {
  //   const rows = this.boardDimension.rows;
  //   const cols = this.boardDimension.cols;
  //   for (var i = 0; i < rows; i++) {
  //     for (var j = 0; j < cols; j++) {
  //       this.board[i][j] = this.nextGenBoard[i][j];
  //       this.nextGenBoard[i][j] = 0;
  //     }
  //   }
  // }

  // private gameRules(row: number, col: number) {
  //   let neighbourCount = this.checkForNeighbors(row, col);

  //   if (this.board[row][col] == 1) {
  //     if (neighbourCount < 2) {
  //       this.nextGenBoard[row][col] = 0;
  //     } else if (neighbourCount == 2 || neighbourCount == 3) {
  //       this.nextGenBoard[row][col] = 1;
  //     } else if (neighbourCount > 3) {
  //       this.nextGenBoard[row][col] = 0;
  //     }
  //   } else if (this.board[row][col] == 0) {
  //     if (neighbourCount == 3) {
  //       this.nextGenBoard[row][col] = 1;
  //     }
  //   }
  // }

  // ngOnInit(): void {
  //   setInterval(() => {
  //     this.nextGen();
  //   }, 500);
  // }
}
