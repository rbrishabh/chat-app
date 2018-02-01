const expect = require('expect');

const {isRealString} = require('./validation');

describe('tests for validation', ()=>{
    it('should return false when invalid string passed', ()=>{
        var str = '';
        var result = isRealString(str);
        expect(result).toBe(false);
});

it('should return false when empty spaces passed', ()=>{
    var str = "   ";
    var result = isRealString(str);
    expect(result).toBe(false);
});

it('should return true if valid string passed',()=>{
    expect(isRealString('abc')).toBe(true)
});
});