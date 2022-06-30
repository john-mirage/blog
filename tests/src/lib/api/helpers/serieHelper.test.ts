import {
  sortSeriesByLastUpdate,
  getSerieFrontmatter,
} from "@api/helpers/serieHelper";
import { Serie } from "@api/interfaces/serie";

const SERIE1 = { lastUpdate: "2021-09-15T15:30:00" };
const SERIE2 = { lastUpdate: "2021-09-13T15:30:00" };
const SERIE3 = { lastUpdate: "2021-09-16T15:30:00" };

describe("serieHelper: sortSeriesByLastUpdate", () => {
  it("should return the series sorted by last update with descending order", () => {
    const SERIES = <Serie[]>[SERIE1, SERIE2, SERIE3];
    const sortedSeries = sortSeriesByLastUpdate(SERIES, "descending");
    expect(sortedSeries).toEqual([SERIE3, SERIE1, SERIE2]);
  });

  it("should return the series sorted by last update with ascending order", () => {
    const SERIES = <Serie[]>[SERIE1, SERIE2, SERIE3];
    const sortedSeries = sortSeriesByLastUpdate(SERIES, "ascending");
    expect(sortedSeries).toEqual([SERIE2, SERIE1, SERIE3]);
  });

  it("should throw an error if the order is invalid", () => {
    const SERIES = <Serie[]>[SERIE1, SERIE2, SERIE3];
    expect(() => {
      sortSeriesByLastUpdate(SERIES, "badOrder");
    }).toThrow("The order is invalid");
  });
});

describe("SerieHelper: getSerieFrontmatter", () => {
  interface testedFrontmatter {
    excerpt: string;
    lastUpdate: string;
    title?: string;
  }

  const FRONTMATTER: testedFrontmatter = {
    excerpt: "excerpt",
    lastUpdate: "lastUpdate",
    title: "title",
  };

  const FILENAME = "serie.md";

  it("should extract the serie data of the frontmatter", () => {
    const serieFrontmatter = getSerieFrontmatter(FILENAME, FRONTMATTER);
    expect(serieFrontmatter).toEqual({
      excerpt: FRONTMATTER.excerpt,
      lastUpdate: FRONTMATTER.lastUpdate,
      title: FRONTMATTER.title,
    });
  });

  it("should throw an error if one or more serie data are missing", () => {
    delete FRONTMATTER.title;
    expect(() => {
      getSerieFrontmatter(FILENAME, FRONTMATTER);
    }).toThrow(`One or more fields are missing in ${FILENAME}`);
  });
});
