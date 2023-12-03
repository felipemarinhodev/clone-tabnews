test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toStrictEqual(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.version).toBeDefined();
  expect(responseBody.version).not.toBeNaN();


  expect(responseBody.opened_connections).toBeDefined();
  expect(responseBody.opened_connections).not.toBeNaN();

  expect(responseBody.max_connections).toBeDefined();
  expect(responseBody.max_connections).not.toBeNaN();
});