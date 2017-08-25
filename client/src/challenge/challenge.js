const challenge = [
    {
        id: 1,
        chall: 'Write a function that returns the sum of two numbers!',
        test: "assert.equal(add(1, 3) === 4, 'addition of 1 & 3 is 4')"
    },
    {
        id: 2,
        chall: "Define a variable 'foo', and set its value to a string!",
        test: "expect(foo).to.be.a('string'); expect(foo).to.equal('bar'); expect(foo).to.have.lengthOf(3);"
    }
]

export default challenge;