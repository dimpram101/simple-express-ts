export class ErrorResponse extends Error {
  code: number;
  tag: string[];

  constructor(code: number, tag: string[], message: string) {
    super(message);
    this.tag = tag;
    this.code = code;
  }
}