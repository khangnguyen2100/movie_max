export const navs = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Movie",
    href: "/movie/popular",
    subs: [
      { name: "Popular", href: "/movie/popular" },
      { name: "Now Playing", href: "/movie/now-playing" },
      { name: "Upcoming", href: "/movie/upcoming" },
      { name: "Top Rated", href: "/movie/top-rated" },
    ],
  },
  {
    name: "TV",
    href: "/tv/popular",
    subs: [
      { name: "Popular", href: "/tv/popular" },
      { name: "Top Rated", href: "/tv/top-rated" },
      { name: "On The Air", href: "/tv/on-the-air" },
      { name: "Airing Today", href: "/tv/airing-today" },
    ],
  },
]
