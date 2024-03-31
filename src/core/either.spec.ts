// import { Either, right } from './either'
import { Either, left, right } from './either'

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10)
  } else {
    return left('error')
  }
}

test('success result', () => {
  const success = doSomething(true)

  if (success.isLeft) {
    console.log(success.value)
  } else {
    console.log(success.value)
  }

  expect(success.isRight).toEqual(true)
  expect(success.isLeft).toEqual(false)
})

test('error result', () => {
  const success = doSomething(false)

  expect(success.isRight).toEqual(false)
  expect(success.isLeft).toEqual(true)
})
