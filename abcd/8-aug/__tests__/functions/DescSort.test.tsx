import { handleSortDesc } from "@/functions/functions";

describe("handleSortDesc", () => {
  test("should sort users in descending order by first name", () => {
    const users = [
      { firstName: "Bob" },
      { firstName: "Charlie" },
      { firstName: "Alice" },
    ];
    expect(handleSortDesc(users)).toEqual([
      { firstName: "Charlie" },
      { firstName: "Bob" },
      { firstName: "Alice" },
    ]);
  });

  test("should handle case insensitivity when sorting", () => {
    const users = [
      { firstName: "charlie" },
      { firstName: "Alice" },
      { firstName: "bob" },
    ];
    expect(handleSortDesc(users)).toEqual([
      { firstName: "charlie" },
      { firstName: "bob" },
      { firstName: "Alice" },
    ]);
  });

  test("should handle empty user list", () => {
    const users: { firstName: string }[] = [];
    expect(handleSortDesc(users)).toEqual([]);
  });

  test("should handle list with one user", () => {
    const users = [{ firstName: "Alice" }];
    expect(handleSortDesc(users)).toEqual([{ firstName: "Alice" }]);
  });

  test("should handle list with duplicate first names", () => {
    const users = [
      { firstName: "Alice" },
      { firstName: "Alice" },
      { firstName: "Bob" },
    ];
    expect(handleSortDesc(users)).toEqual([
      { firstName: "Bob" },
      { firstName: "Alice" },
      { firstName: "Alice" },
    ]);
  });
});
