// Social groups with different POI category preferences
export const socialGroups = {
  young_adults: {
    name: "Young Adults",
    weights: {
      restaurant: 1.5,
      park: 0.8,
      school: 0.5,
      shopping: 1.2,
      entertainment: 2.0,
      healthcare: 0.6
    }
  },
  families: {
    name: "Families with Children",
    weights: {
      restaurant: 1.0,
      park: 1.8,
      school: 2.0,
      shopping: 1.2,
      entertainment: 1.5,
      healthcare: 1.4
    }
  },
  seniors: {
    name: "Seniors",
    weights: {
      restaurant: 0.8,
      park: 1.5,
      school: 0.3,
      shopping: 1.0,
      entertainment: 0.7,
      healthcare: 2.0
    }
  },
  students: {
    name: "Students",
    weights: {
      restaurant: 1.7,
      park: 1.0,
      school: 2.0,
      shopping: 0.8,
      entertainment: 1.8,
      healthcare: 0.5
    }
  },
  professionals: {
    name: "Working Professionals",
    weights: {
      restaurant: 1.5,
      park: 1.0,
      school: 0.7,
      shopping: 1.3,
      entertainment: 1.2,
      healthcare: 1.0
    }
  }
};
