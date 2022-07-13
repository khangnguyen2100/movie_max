export  const filterType = [ "TV Series","Movie"]
export  const filterHead = ['Regions', 'Categories', 'Time Periods', 'Recent', "Subtitles"]
export const filters = [
  {
    "name" : 'regions',
    value : ["All regions","America","Korea","U.K","Japan","Thailand","Europe","China","India","Australia","Indonesia","Other",],
  },
  {
    "name" : 'categories',
    value : ["All Categories","Drama","Action","Romance","Fantasy","Animation","Suspense","Sci-Fi","Horror","Comedy","Crime","Adventure","Thriller","Family","Musical","War","LGBTQ","Catastrophe","Documentary","Other"],
  },
  {
    "name" : 'timePeriods',
    value : ["All Time Periods","2022","2021","2020","2019","2018","2017","2016","2015-2011","2010-2000","Before"],
  },
  {
    "name" : 'recent',
    value :  ["Recent","Popularity",],
  },
  {
    "name" : 'subtitles',
    value : ["All Subtitles","Manual Translation",],
  },
]
const searchFiltesConfig = [
  {
    "id": 2,
    "name": "TV Series",
    "params": "TV,SETI,MINISERIES,VARIETY,TALK,COMIC,DOCUMENTARY",
    "screeningItems": [
        {
          "id": 4,
          "items": [
              {
                  "name": "All regions",
                  "params": "",
                  "screeningType": "area"
              },
              {
                  "name": "America",
                  "params": "61",
                  "screeningType": "area"
              },
              {
                  "name": "Korea",
                  "params": "53",
                  "screeningType": "area"
              },
              {
                  "name": "U.K",
                  "params": "60",
                  "screeningType": "area"
              },
              {
                  "name": "Japan",
                  "params": "44",
                  "screeningType": "area"
              },
              {
                  "name": "Thailand",
                  "params": "57",
                  "screeningType": "area"
              },
              {
                  "name": "Europe",
                  "params": "37,60,58,50,54,55,48,46,45,34,35,38,39,43,62",
                  "screeningType": "area"
              },
              {
                  "name": "China",
                  "params": "32,56",
                  "screeningType": "area"
              },
              {
                  "name": "India",
                  "params": "40",
                  "screeningType": "area"
              },
              {
                  "name": "Australia",
                  "params": "27",
                  "screeningType": "area"
              },
              {
                  "name": "Indonesia",
                  "params": "41",
                  "screeningType": "area"
              },
              {
                  "name": "other",
                  "params": "26,28,29,30,31,33,36,42,47,49,59",
                  "screeningType": "area"
              }
          ],
          "name": "All regions"
        },
        {
            "id": 5,
            "items": [
                {
                    "name": "All Categories",
                    "params": "",
                    "screeningType": "category"
                },
                {
                    "name": "Drama",
                    "params": "8",
                    "screeningType": "category"
                },
                {
                    "name": "Action",
                    "params": "1",
                    "screeningType": "category"
                },
                {
                    "name": "Romance",
                    "params": "18",
                    "screeningType": "category"
                },
                {
                    "name": "Fantasy",
                    "params": "10",
                    "screeningType": "category"
                },
                {
                    "name": "Animation",
                    "params": "3",
                    "screeningType": "category"
                },
                {
                    "name": "Suspense",
                    "params": "16",
                    "screeningType": "category"
                },
                {
                    "name": "Sci-Fi",
                    "params": "19",
                    "screeningType": "category"
                },
                {
                    "name": "Horror",
                    "params": "13",
                    "screeningType": "category"
                },
                {
                    "name": "Comedy",
                    "params": "5",
                    "screeningType": "category"
                },
                {
                    "name": "Crime",
                    "params": "6",
                    "screeningType": "category"
                },
                {
                    "name": "Adventure",
                    "params": "2",
                    "screeningType": "category"
                },
                {
                    "name": "Thriller",
                    "params": "23",
                    "screeningType": "category"
                },
                {
                    "name": "Family",
                    "params": "9",
                    "screeningType": "category"
                },
                {
                    "name": "Musical",
                    "params": "63,14,15",
                    "screeningType": "category"
                },
                {
                    "name": "War",
                    "params": "24",
                    "screeningType": "category"
                },
                {
                    "name": "LGBTQ",
                    "params": "65",
                    "screeningType": "category"
                },
                {
                    "name": "Catastrophe",
                    "params": "64",
                    "screeningType": "category"
                },
                {
                    "name": "Documentary",
                    "params": "7",
                    "screeningType": "category"
                },
                {
                    "name": "other",
                    "params": "7,4,11,12,17,22,21,20,25",
                    "screeningType": "category"
                }
            ],
            "name": "All Categories"
        },
        {
            "id": 6,
            "items": [
                {
                    "name": "All Time Periods",
                    "params": "",
                    "screeningType": "year"
                },
                {
                    "name": "2022",
                    "params": "2022,2022",
                    "screeningType": "year"
                },
                {
                    "name": "2021",
                    "params": "2021,2021",
                    "screeningType": "year"
                },
                {
                    "name": "2020",
                    "params": "2020,2020",
                    "screeningType": "year"
                },
                {
                    "name": "2019",
                    "params": "2019,2019",
                    "screeningType": "year"
                },
                {
                    "name": "2018",
                    "params": "2018,2018",
                    "screeningType": "year"
                },
                {
                    "name": "2017",
                    "params": "2017,2017",
                    "screeningType": "year"
                },
                {
                    "name": "2016",
                    "params": "2016,2016",
                    "screeningType": "year"
                },
                {
                    "name": "2015-2011",
                    "params": "2011,2015",
                    "screeningType": "year"
                },
                {
                    "name": "2010-2000",
                    "params": "2000,2010",
                    "screeningType": "year"
                },
                {
                    "name": "Before",
                    "params": "1900,1999",
                    "screeningType": "year"
                }
            ],
            "name": "All Time Periods"
        },
        {
            "id": null,
            "items": [
                {
                    "name": "All Subtitles",
                    "params": "",
                    "screeningType": "subtitles"
                },
                {
                    "name": "Manual Translation",
                    "params": "0",
                    "screeningType": "subtitles"
                }
            ],
            "name": "字幕筛选"
        },
        {
            "id": null,
            "items": [
                {
                    "name": "Recent",
                    "params": "up",
                    "screeningType": "order"
                },
                {
                    "name": "Popularity",
                    "params": "count",
                    "screeningType": "order"
                }
            ],
            "name": "排序规则"
        }
    ]
  },
  {
    id: 1,
    "name": "Movie",
    "params": "MOVIE,TVSPECIAL",
    "screeningItems": [
      {
          id: 1,
          items: [
              {
                  "name": "All regions",
                  "params": "",
                  "screeningType": "area"
              },
              {
                  "name": "America",
                  "params": "61",
                  "screeningType": "area"
              },
              {
                  "name": "Korea",
                  "params": "53",
                  "screeningType": "area"
              },
              {
                  "name": "U.K",
                  "params": "60",
                  "screeningType": "area"
              },
              {
                  "name": "Japan",
                  "params": "44",
                  "screeningType": "area"
              },
              {
                  "name": "Thailand",
                  "params": "57",
                  "screeningType": "area"
              },
              {
                  "name": "Europe",
                  "params": "37,60,58,50,54,55,48,46,45,34,35,38,39,43,62",
                  "screeningType": "area"
              },
              {
                  "name": "China",
                  "params": "32,56",
                  "screeningType": "area"
              },
              {
                  "name": "India",
                  "params": "40",
                  "screeningType": "area"
              },
              {
                  "name": "Australia",
                  "params": "27",
                  "screeningType": "area"
              },
              {
                  "name": "Indonesia",
                  "params": "41",
                  "screeningType": "area"
              },
              {
                  "name": "other",
                  "params": "26,28,29,30,31,33,36,42,47,49,59",
                  "screeningType": "area"
              }
          ],
          "name": "All regions"
      },
      {
          "id": 2,
          "items": [
              {
                  "name": "All Categories",
                  "params": "",
                  "screeningType": "category"
              },
              {
                  "name": "Drama",
                  "params": "8",
                  "screeningType": "category"
              },
              {
                  "name": "Action",
                  "params": "1",
                  "screeningType": "category"
              },
              {
                  "name": "Romance",
                  "params": "18",
                  "screeningType": "category"
              },
              {
                  "name": "Fantasy",
                  "params": "10",
                  "screeningType": "category"
              },
              {
                  "name": "Animation",
                  "params": "3",
                  "screeningType": "category"
              },
              {
                  "name": "Suspense",
                  "params": "16",
                  "screeningType": "category"
              },
              {
                  "name": "Sci-Fi",
                  "params": "19",
                  "screeningType": "category"
              },
              {
                  "name": "Horror",
                  "params": "13",
                  "screeningType": "category"
              },
              {
                  "name": "Comedy",
                  "params": "5",
                  "screeningType": "category"
              },
              {
                  "name": "Crime",
                  "params": "6",
                  "screeningType": "category"
              },
              {
                  "name": "Adventure",
                  "params": "2",
                  "screeningType": "category"
              },
              {
                  "name": "Thriller",
                  "params": "23",
                  "screeningType": "category"
              },
              {
                  "name": "Family",
                  "params": "9",
                  "screeningType": "category"
              },
              {
                  "name": "Musical",
                  "params": "63,14,15",
                  "screeningType": "category"
              },
              {
                  "name": "War",
                  "params": "24",
                  "screeningType": "category"
              },
              {
                  "name": "LGBTQ",
                  "params": "65",
                  "screeningType": "category"
              },
              {
                  "name": "Catastrophe",
                  "params": "64",
                  "screeningType": "category"
              },
              {
                  "name": "Documentary",
                  "params": "7",
                  "screeningType": "category"
              },
              {
                  "name": "other",
                  "params": "4,11,12,17,22,21,20,25",
                  "screeningType": "category"
              }
          ],
          "name": "All Categories"
      },
      {
          "id": 3,
          "items": [
              {
                  "name": "All Time Periods",
                  "params": "",
                  "screeningType": "year"
              },
              {
                  "name": "2022",
                  "params": "2022,2022",
                  "screeningType": "year"
              },
              {
                  "name": "2021",
                  "params": "2021,2021",
                  "screeningType": "year"
              },
              {
                  "name": "2020",
                  "params": "2020,2020",
                  "screeningType": "year"
              },
              {
                  "name": "2019",
                  "params": "2019,2019",
                  "screeningType": "year"
              },
              {
                  "name": "2018",
                  "params": "2018,2018",
                  "screeningType": "year"
              },
              {
                  "name": "2017",
                  "params": "2017,2017",
                  "screeningType": "year"
              },
              {
                  "name": "2016",
                  "params": "2016,2016",
                  "screeningType": "year"
              },
              {
                  "name": "2015-2011",
                  "params": "2011,2015",
                  "screeningType": "year"
              },
              {
                  "name": "2010-2000",
                  "params": "2000,2010",
                  "screeningType": "year"
              },
              {
                  "name": "Before",
                  "params": "1900,1999",
                  "screeningType": "year"
              }
          ],
          "name": "All Time Periods"
      },
      {
          "id": null,
          "items": [
              {
                  "name": "All Subtitles",
                  "params": "",
                  "screeningType": "subtitles"
              },
              {
                  "name": "Manual Translation",
                  "params": "0",
                  "screeningType": "subtitles"
              }
          ],
          "name": "字幕筛选"
      },
      {
          "id": null,
          "items": [
              {
                  "name": "Recent",
                  "params": "up",
                  "screeningType": "order"
              },
              {
                  "name": "Popularity",
                  "params": "count",
                  "screeningType": "order"
              }
          ],
          "name": "排序规则"
      }
    ]
  },
  {
      "id": 3,
      "name": "Anime",
      "params": "COMIC",
      "screeningItems": [
          {
              "id": 7,
              "items": [
                  {
                      "name": "All regions",
                      "params": "",
                      "screeningType": "area"
                  },
                  {
                      "name": "Japan",
                      "params": "44",
                      "screeningType": "area"
                  },
                  {
                      "name": "other",
                      "params": "26,28,29,30,31,33,36,42,47,49,59,53,56,76,32,27,34,35,37,38,39,40,41,46,45,43,50,51,52,48,54,60,70,58,57,55,61,62,68,69,74,75,73,71,72,77,78,79,81,82,96,1498,1421,1499,1422,1480,1481,1482",
                      "screeningType": "area"
                  }
              ],
              "name": "All regions"
          },
          {
              "id": 8,
              "items": [
                  {
                      "name": "All Categories",
                      "params": "",
                      "screeningType": "category"
                  },
                  {
                      "name": "Drama",
                      "params": "8",
                      "screeningType": "category"
                  },
                  {
                      "name": "Suspense",
                      "params": "16",
                      "screeningType": "category"
                  },
                  {
                      "name": "Sci-Fi",
                      "params": "19",
                      "screeningType": "category"
                  },
                  {
                      "name": "Action",
                      "params": "1",
                      "screeningType": "category"
                  },
                  {
                      "name": "Romance",
                      "params": "18",
                      "screeningType": "category"
                  },
                  {
                      "name": "Fantasy",
                      "params": "10",
                      "screeningType": "category"
                  },
                  {
                      "name": "Horror",
                      "params": "13",
                      "screeningType": "category"
                  },
                  {
                      "name": "Comedy",
                      "params": "5",
                      "screeningType": "category"
                  },
                  {
                      "name": "Crime",
                      "params": "6",
                      "screeningType": "category"
                  },
                  {
                      "name": "Adventure",
                      "params": "2",
                      "screeningType": "category"
                  },
                  {
                      "name": "Animation",
                      "params": "3",
                      "screeningType": "category"
                  },
                  {
                      "name": "Thriller",
                      "params": "23",
                      "screeningType": "category"
                  },
                  {
                      "name": "Family",
                      "params": "9",
                      "screeningType": "category"
                  },
                  {
                      "name": "Musical",
                      "params": "63,14,15",
                      "screeningType": "category"
                  },
                  {
                      "name": "War",
                      "params": "24",
                      "screeningType": "category"
                  },
                  {
                      "name": "LGBTQ",
                      "params": "65",
                      "screeningType": "category"
                  },
                  {
                      "name": "Catastrophe",
                      "params": "64",
                      "screeningType": "category"
                  },
                  {
                      "name": "other",
                      "params": "7,4,11,12,17,22,21,20,25",
                      "screeningType": "category"
                  }
              ],
              "name": "All Categories"
          },
          {
              "id": 9,
              "items": [
                  {
                      "name": "All Time Periods",
                      "params": "",
                      "screeningType": "year"
                  },
                  {
                      "name": "2022",
                      "params": "2022,2022",
                      "screeningType": "year"
                  },
                  {
                      "name": "2021",
                      "params": "2021,2021",
                      "screeningType": "year"
                  },
                  {
                      "name": "2020",
                      "params": "2020,2020",
                      "screeningType": "year"
                  },
                  {
                      "name": "2019",
                      "params": "2019,2019",
                      "screeningType": "year"
                  },
                  {
                      "name": "2018",
                      "params": "2018,2018",
                      "screeningType": "year"
                  },
                  {
                      "name": "2017",
                      "params": "2017,2017",
                      "screeningType": "year"
                  },
                  {
                      "name": "2016",
                      "params": "2016,2016",
                      "screeningType": "year"
                  },
                  {
                      "name": "2015-2011",
                      "params": "2011,2015",
                      "screeningType": "year"
                  },
                  {
                      "name": "2010-2000",
                      "params": "2000,2010",
                      "screeningType": "year"
                  },
                  {
                      "name": "Before",
                      "params": "1900,2009",
                      "screeningType": "year"
                  }
              ],
              "name": "All Time Periods"
          },
          {
              "id": null,
              "items": [
                  {
                      "name": "All Subtitles",
                      "params": "",
                      "screeningType": "subtitles"
                  },
                  {
                      "name": "Manual Translation",
                      "params": "0",
                      "screeningType": "subtitles"
                  }
              ],
              "name": "字幕筛选"
          },
          {
              "id": null,
              "items": [
                  {
                      "name": "Recent",
                      "params": "up",
                      "screeningType": "order"
                  },
                  {
                      "name": "Popularity",
                      "params": "count",
                      "screeningType": "order"
                  }
              ],
              "name": "排序规则"
          }
      ]
  }
]
export const handleConvertParams = (filters) => {
	// get id of type [Tv series, Movie] and target to that obj
	const idType = filters.type.idFilterValue
	const searchFilterType = searchFiltesConfig[idType]

  const result = {
    "params": searchFilterType.params,

    "area": searchFilterType.screeningItems[filters.regions.id].items[filters.regions.idFilterValue].params,
    "category": searchFilterType.screeningItems[filters.categories.id].items[filters.categories.idFilterValue].params,
    "year": searchFilterType.screeningItems[filters.timePeriods.id].items[filters.timePeriods.idFilterValue].params,
    "subtitles": searchFilterType.screeningItems[filters.subtitles.id].items[filters.subtitles.idFilterValue].params,
		"order" : searchFilterType.screeningItems[filters.recent.id].items[filters.recent.idFilterValue].params,
  }
  return result
}
export default searchFiltesConfig
