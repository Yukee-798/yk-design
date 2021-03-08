test('commonTest', () => {
    expect(2 + 2).toBe(4);
    expect(2 + 2).not.toBe(5);
})

test('boolean', () => {
    expect(1).toBeTruthy();
    expect(0).toBeFalsy();
})

test('number', () => {
    expect(4).toBeGreaterThan(3);
    expect(3).toBeLessThan(4);
})

test('object', () => {
    // 判断的是对象的内容
    expect({name: 'momo'}).toEqual({name: 'momo'});
    // 相当于 ===，判断的是对象的内存地址
    expect({name: 'momo'}).toBe({name: 'momo'});
})