
namespace util {

  /**
    * Converts two numbers together.
    * @param a is a number.
    * @param b is a number
    */
  export function addNumbers(a: number, b: number) : number {
    return a + b
  }

  export function addStrings(a: string, b: string) : number {
    return parseInt(a) + parseInt(b);
  }

  export function multiply(a: number, b: number) {
    return a * b
  }

  export function divide(a: number, b: number) {
    return a / b
  }

}

