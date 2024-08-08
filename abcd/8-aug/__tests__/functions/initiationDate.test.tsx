import { validateInitiationDate } from "@/functions/functions";

describe("InitiationDate function", () => {
    
  test("returns error for invalid or no parameter", async () => {
    expect(validateInitiationDate("")).toBe("Value Not Provided");
  });

  test("retuns correct ouput with valid date", async () => {
    expect(validateInitiationDate("2024-08-07")).toBe(true);
  });

  test("return error if date is older than 2 months", () => {
    expect(validateInitiationDate("2024-06-07")).toBe(
      "Initiation Date should be not be less than of last 2 month"
    );
  });

  test("return error if date is older than 2 months", () => {
    expect(validateInitiationDate("2024-06-06")).toBe(
      "Initiation Date should be not be less than of last 2 month"
    );
  });

  test("return true if date is not older than 2 months", () => {
    expect(validateInitiationDate("2024-06-15")).toBe(true);
  });

  test("return error if date is not valid", () => {
    expect(validateInitiationDate("2asdfsd-0asdf6-0asdfs8")).toBe(
      "Given Value Is Not Valid Date"
    );
  });

  test("return error if date is from future", () => {
    expect(validateInitiationDate("2025-06-08")).toBe(
      "Initiation Date should not be greater than today"
    );
  });
});
