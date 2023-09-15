const calculadora = require("../../models/calculadora.js");

test("somar 2 + 2 deveria retornar 4", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});

test("somar 5 + 100 deveria retornar 105", () => {
  const resultado = calculadora.somar(5, 100);
  expect(resultado).toBe(105);
});

test("somar 'banana' + 100 deveria retornar 'Error'", () => {
  const resultado = calculadora.somar("banana", 100);
  expect(resultado).toBe("Error");
});

test("somar 100 + 'banana' deveria retornar 'Error'", () => {
  const resultado = calculadora.somar(100, "banana");
  expect(resultado).toBe("Error");
});

test("somar 100 + null deveria retornar 'Error'", () => {
  const resultado = calculadora.somar(100, null);
  expect(resultado).toBe("Error");
});

test("somar undefined + 100 deveria retornar 'Error'", () => {
  const resultado = calculadora.somar(undefined, 100);
  expect(resultado).toBe("Error");
});

test("somar 0 + 100 deveria retornar 100", () => {
  const resultado = calculadora.somar(0, 100);
  expect(resultado).toBe(100);
});

test("somar 0 + 0 deveria retornar 0", () => {
  const resultado = calculadora.somar(0, 0);
  expect(resultado).toBe(0);
});

