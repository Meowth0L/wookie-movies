export enum NavigationRoutes {
  HOME = "/",
  MOVIES = "/movies",
  MOVIE = "/movies/:slug",
}

export const ApiRoutes = {
  movie: {
    getList: (q: string) => `/movies?q=${q}`,
    getBySlug: (slug: string) => `/movies/${slug}`,
  },
};
