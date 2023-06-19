import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  interval,
  takeUntil,
} from 'rxjs';

export interface Cell {
  status: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private boardDimension = {
    rows: 30,
    cols: 30,
  };

  public board: number[][] = this.createBoard(
    this.boardDimension.rows,
    this.boardDimension.cols
  );
  private nextGenBoard: number[][] = this.createBoard(
    this.boardDimension.rows,
    this.boardDimension.cols
  );

  private stopGame$: Subject<any> = new Subject();

  private gameBoardSource: BehaviorSubject<number[][]> = new BehaviorSubject(
    this.board
  );
  public gameBoard$: Observable<number[][]> =
    this.gameBoardSource.asObservable();

  private gameInterval$: Observable<any> = interval(500);

  constructor() {
    this.populateBoard(this.board);
    this.gameInterval$.pipe(takeUntil(this.stopGame$)).subscribe(() => {
      this.nextGen();
    });
  }

  private createBoard(rows: number, cols: number) {
    let board = new Array(rows);

    for (let i = 0; i < cols; i++) {
      board[i] = new Array(cols);
    }

    return board;
  }

  private populateBoard(board: number[][]): void {
    const rows = this.boardDimension.rows;
    const cols = this.boardDimension.cols;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        board[i][j] = Math.random() > 0.5 ? 1 : 0;
      }
    }
  }

  private copyAndResetBoard(): void {
    const rows = this.boardDimension.rows;
    const cols = this.boardDimension.cols;
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        this.board[i][j] = this.nextGenBoard[i][j];
        this.nextGenBoard[i][j] = 0;
      }
    }
  }

  private checkForNeighbors(row: number, col: number): number {
    const rows = this.boardDimension.rows;
    const cols = this.boardDimension.cols;
    let count = 0;
    if (row - 1 >= 0) {
      if (this.board[row - 1][col] == 1) count++;
    }
    if (row - 1 >= 0 && col - 1 >= 0) {
      if (this.board[row - 1][col - 1] == 1) count++;
    }
    if (row - 1 >= 0 && col + 1 < cols) {
      if (this.board[row - 1][col + 1] == 1) count++;
    }
    if (col - 1 >= 0) {
      if (this.board[row][col - 1] == 1) count++;
    }
    if (col + 1 < cols) {
      if (this.board[row][col + 1] == 1) count++;
    }
    if (row + 1 < rows) {
      if (this.board[row + 1][col] == 1) count++;
    }
    if (row + 1 < rows && col - 1 >= 0) {
      if (this.board[row + 1][col - 1] == 1) count++;
    }
    if (row + 1 < rows && col + 1 < cols) {
      if (this.board[row + 1][col + 1] == 1) count++;
    }
    return count;
  }

  private gameRules(row: number, col: number): void {
    let neighbourCount = this.checkForNeighbors(row, col);

    if (this.board[row][col] == 1) {
      if (neighbourCount < 2) {
        this.nextGenBoard[row][col] = 0;
      } else if (neighbourCount == 2 || neighbourCount == 3) {
        this.nextGenBoard[row][col] = 1;
      } else if (neighbourCount > 3) {
        this.nextGenBoard[row][col] = 0;
      }
    } else if (this.board[row][col] == 0) {
      if (neighbourCount == 3) {
        this.nextGenBoard[row][col] = 1;
      }
    }
  }

  private nextGen(): void {
    const rows = this.boardDimension.rows;
    const cols = this.boardDimension.cols;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        this.gameRules(i, j);
      }
    }
    this.copyAndResetBoard();
  }

  public stopGame() {
    this.stopGame$.next(void 0);
  }
}
