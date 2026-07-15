import { ICommand } from './ICommand';

export class CommandHistory {
  private static undoStack: ICommand[] = [];
  private static redoStack: ICommand[] = [];

  static execute(command: ICommand) {
    command.execute();
    this.undoStack.push(command);
    this.redoStack = []; // Clear redo on new action
  }

  static undo() {
    const command = this.undoStack.pop();
    if (command) {
      command.undo();
      this.redoStack.push(command);
    }
  }

  static redo() {
    const command = this.redoStack.pop();
    if (command) {
      command.execute();
      this.undoStack.push(command);
    }
  }

  static clear() {
    this.undoStack = [];
    this.redoStack = [];
  }
}
