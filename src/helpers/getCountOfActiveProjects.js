export const getCountOfActiveProjects = (state) => {
  return state.properties.reduce((count, property) => {
    return (
      count +
      property.projects.reduce((projectCount, project) => {
        return project.status === "in progress"
          ? projectCount + 1
          : projectCount;
      }, 0)
    );
  }, 0);
};
