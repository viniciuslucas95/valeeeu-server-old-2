import { Name } from "./Name"

describe('Name', () => {
    describe('should', () => {
        test('be created', () => {
            const name = Name.create('Carlos Daniel')

            expect(name.value).toBe('Carlos Daniel')
        })

        test('be gotten', () => {
            const name = 'Carlos Daniel'

            const nameObjectValue = Name.from(name, true)

            expect(nameObjectValue).toBeTruthy()
        })
    })

    describe('should NOT', () => {
        test('be created because of being too short', () => {
            let thrownError

            try {
                Name.create('A')
            } catch (err) {
                thrownError = () => { throw err }
            }

            expect(thrownError).toThrow()
        })

        test('be created because of being the wrong type', () => {
            let thrownError

            try {
                //@ts-ignore
                Name.create(123)
            } catch (err) {
                thrownError = () => { throw err }
            }

            expect(thrownError).toThrow()
        })
    })
})