export const getTotalAmountByType = (state, type) => {
  return state.properties.reduce((accProperties, property) => {
    const totalExpenses = property.projects.reduce((accProjects, project) => {
      const totalProjectExpenses = project.transactions.reduce(
        (accTransactions, transaction) => {
          if (transaction.type === type)
            return accTransactions + transaction.amount;

          return accTransactions;
        },
        0
      );
      return accProjects + totalProjectExpenses;
    }, 0);
    return accProperties + totalExpenses;
  }, 0);
};
