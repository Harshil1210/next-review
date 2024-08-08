import { createUserId } from "@/functions/functions";

describe("createUserId function", () => {
  test("returns correct output with valid parameters", async () => {
    expect(await createUserId("2024-08-07", "test", "demo")).toBe(
      "2024-te-de-8"
    );
  });

  test("returns error when date is not provided", async () => {
    expect(await createUserId("", "test", "deno")).toContain(
      "Initiation Date Not Provided"
    );
  });

  test("returns error when FirstName is not provided", async () => {
    expect(await createUserId("2024-08-07", "", "deno")).toContain(
      "First Name Not Provided"
    );
  });

  test("returns error when lastName is not provided", async () => {
    expect(await createUserId("2024-08-07", "test", "")).toContain(
      "Last Name Not Provided"
    );
  });

  test("returns error when nothing is provided", async () => {
    const err = [
      "Initiation Date Not Provided",
      "First Name Not Provided",
      "Last Name Not Provided",
    ];
    expect(await createUserId("", "", "")).toEqual(err);
  });

  //   test("returns error when date is not valid", async () => {
  //     expect(await createUserId("4234fr-324hgf4-sdfg", "test", "deno")).toContain(
  //       "Initiation Date Not Provided"
  //     );
  //   });
});
