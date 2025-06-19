export default {
  title: 'Github Search',
  searchPlaceholder: 'Search input',
  loading: 'Loading...',
  error: 'An error occurred',
  viewProfile: 'View profile',
  duplicate: 'Duplicate',
  delete: 'Delete',
  edit: 'Edit',
  noResults: 'No results found',
  selectedElements: (count: number) => `element${count > 1 ? 's' : ''} selected`,
  githubLimit: 'Github API rate limit exceeded. Please try again later.'
};
