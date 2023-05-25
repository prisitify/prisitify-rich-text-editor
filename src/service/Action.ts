export default interface Action {


  active(): void;

  inactive(): void;

  getKey(): string;

}
