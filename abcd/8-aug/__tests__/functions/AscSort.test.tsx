import { handleSortAsc } from "@/functions/functions";

describe("handleSortAsc", () => {
  test("should sort users in ascending order by first name", () => {
    const users = [
      { firstName: "Charlie" },
      { firstName: "Alice" },
      { firstName: "Bob" },
    ];
    expect(handleSortAsc(users)).toEqual([
      { firstName: "Alice" },
      { firstName: "Bob" },
      { firstName: "Charlie" },
    ]);
  });

  test("should handle case insensitivity when sorting", () => {
    const users = [
      { firstName: "charlie" },
      { firstName: "Alice" },
      { firstName: "bob" },
    ];
    expect(handleSortAsc(users)).toEqual([
      { firstName: "Alice" },
      { firstName: "bob" },
      { firstName: "charlie" },
    ]);
  });

  test("should handle empty user list", () => {
    const users: { firstName: string }[] = [];
    expect(handleSortAsc(users)).toEqual([]);
  });

  test("should handle list with one user", () => {
    const users = [{ firstName: "Alice" }];

    expect(handleSortAsc(users)).toEqual([{ firstName: "Alice" }]);
  });

  test("should handle list with duplicate first names", () => {
    const users = [
      { firstName: "Alice" },
      { firstName: "Alice" },
      { firstName: "Bob" },
    ];
    expect(handleSortAsc(users)).toEqual([
      { firstName: "Alice" },
      { firstName: "Alice" },
      { firstName: "Bob" },
    ]);
  });
});
