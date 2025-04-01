import {
  DAY,
  HOUR,
  MINUTE,
  MONTH,
  SECOND,
  WEEK,
  YEAR,
  formatDateAgo,
} from "./date";

describe("formatDateAgo", () => {
  let now: Date;

  beforeEach(() => {
    now = new Date();
  });

  it("just now", () => {
    expect(formatDateAgo(now)).toBe("just now");
    expect(formatDateAgo(now.toISOString())).toBe("just now");
    expect(formatDateAgo(now.getTime() - SECOND / 2)).toBe("just now");
    expect(formatDateAgo(now.getTime() + YEAR)).toBe("just now");
  });

  it("seconds ago", () => {
    expect(formatDateAgo(now.getTime() - SECOND)).toBe("1s");
    expect(formatDateAgo(now.getTime() - 2 * SECOND)).toBe("2s");
    expect(formatDateAgo(now.getTime() - 59 * SECOND)).toBe("59s");
  });

  it("minutes ago", () => {
    expect(formatDateAgo(now.getTime() - MINUTE)).toBe("1m");
    expect(formatDateAgo(now.getTime() - 2 * MINUTE)).toBe("2m");
    expect(formatDateAgo(now.getTime() - 59 * MINUTE)).toBe("59m");
  });

  it("hours ago", () => {
    expect(formatDateAgo(now.getTime() - HOUR)).toBe("1h");
    expect(formatDateAgo(now.getTime() - 2 * HOUR)).toBe("2h");
    expect(formatDateAgo(now.getTime() - 23 * HOUR)).toBe("23h");
  });

  it("days ago", () => {
    expect(formatDateAgo(now.getTime() - DAY)).toBe("1d");
    expect(formatDateAgo(now.getTime() - 2 * DAY)).toBe("2d");
    expect(formatDateAgo(now.getTime() - 6 * DAY)).toBe("6d");
  });

  it("weeks ago", () => {
    expect(formatDateAgo(now.getTime() - WEEK)).toBe("1w");
    expect(formatDateAgo(now.getTime() - 2 * WEEK)).toBe("2w");
    expect(formatDateAgo(now.getTime() - 4 * WEEK)).toBe("4w");
  });

  it("months ago", () => {
    expect(formatDateAgo(now.getTime() - MONTH)).toBe("1mo");
    expect(formatDateAgo(now.getTime() - 2 * MONTH)).toBe("2mo");
    expect(formatDateAgo(now.getTime() - 11 * MONTH)).toBe("11mo");
  });

  it("years ago", () => {
    expect(formatDateAgo(now.getTime() - YEAR)).toBe("1y");
    expect(formatDateAgo(now.getTime() - 2 * YEAR)).toBe("2y");
    expect(formatDateAgo(now.getTime() - 5 * YEAR)).toBe("5y");
  });
});
