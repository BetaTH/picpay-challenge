// Error
export class Left<L> {
  readonly value: L
  readonly isLeft = true
  readonly isRight = false
  constructor(value: L) {
    this.value = value
  }
}

// Success
export class Right<R> {
  readonly value: R
  readonly isLeft = false
  readonly isRight = true
  constructor(value: R) {
    this.value = value
  }
}

export type Either<L, R> = Left<L> | Right<R>

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value)
}

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value)
}

// type Left<L> = {
//   isLeft: true
//   isRight: false
//   value: L
// }

// type Right<R> = {
//   isLeft: false
//   isRight: true
//   value: R
// }

// export type Either<L, R> = Left<L> | Right<R>

// export const left = <L, R>(value: L): Either<L, R> => {
//   return {
//     isLeft: true,
//     isRight: false,
//     value,
//   }
// }

// export const right = <L, R>(value: R): Either<L, R> => {
//   return {
//     isLeft: false,
//     isRight: true,
//     value,
//   }
// }
