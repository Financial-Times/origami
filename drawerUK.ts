import { TNavMenu } from '@financial-times/dotcom-types-navigation'

const data: TNavMenu = {
  label: 'Drawer',
  items: [
    {
      label: 'Top sections',
      url: null,
      submenu: {
        label: null,
        items: [
          {
            label: 'Home',
            url: '/',
            submenu: null
          },
          {
            label: 'World',
            url: '/world',
            selected: true,
            submenu: {
              label: null,
              items: [
                {
                  label: 'Global Economy',
                  url: '/global-economy',
                  submenu: null
                },
                {
                  label: 'UK',
                  url: '/world/uk',
                  submenu: {
                    label: null,
                    items: [
                      {
                        label: 'UK Business & Economy',
                        url: '/uk-business-economy',
                        submenu: null
                      },
                      {
                        label: 'UK Politics & Policy',
                        url: '/world/uk/politics',
                        submenu: null
                      },
                      {
                        label: 'UK Companies',
                        url: '/companies/uk',
                        submenu: null
                      }
                    ]
                  }
                },
                {
                  label: 'US',
                  url: '/world/us',
                  submenu: {
                    label: null,
                    items: [
                      {
                        label: 'US Economy',
                        url: '/us-economy',
                        submenu: null
                      },
                      {
                        label: 'US Politics & Policy',
                        url: '/world/us/politics',
                        submenu: null
                      },
                      {
                        label: 'US Companies',
                        url: '/companies/us',
                        submenu: null
                      }
                    ]
                  }
                },
                {
                  label: 'China',
                  url: '/world/asia-pacific/china',
                  submenu: {
                    label: null,
                    items: [
                      {
                        label: 'Chinese Economy',
                        url: '/chinese-economy',
                        submenu: null
                      },
                      {
                        label: 'China Politics & Policy',
                        url: '/chinese-politics-policy',
                        submenu: null
                      }
                    ]
                  }
                },
                {
                  label: 'Africa',
                  url: '/world/africa',
                  submenu: null
                },
                {
                  label: 'Asia Pacific',
                  url: '/world/asia-pacific',
                  submenu: null
                },
                {
                  label: 'Emerging Markets',
                  url: '/emerging-markets',
                  submenu: null
                },
                {
                  label: 'Europe',
                  url: '/world/europe',
                  submenu: null
                },
                {
                  label: 'Americas',
                  url: '/world/americas',
                  submenu: null
                },
                {
                  label: 'Middle East and North Africa',
                  url: '/world/mideast',
                  submenu: null
                }
              ]
            }
          },
          {
            label: 'UK',
            url: '/world/uk',
            submenu: {
              label: null,
              items: [
                {
                  label: 'UK Business & Economy',
                  url: '/uk-business-economy',
                  submenu: null
                },
                {
                  label: 'UK Politics & Policy',
                  url: '/world/uk/politics',
                  submenu: null
                },
                {
                  label: 'UK Companies',
                  url: '/companies/uk',
                  submenu: null
                }
              ]
            }
          },
          {
            label: 'Companies',
            url: '/companies',
            submenu: {
              label: null,
              items: [
                {
                  label: 'Energy',
                  url: '/companies/energy',
                  submenu: {
                    label: null,
                    items: [
                      {
                        label: 'Mining',
                        url: '/companies/mining',
                        submenu: null
                      },
                      {
                        label: 'Oil & Gas',
                        url: '/companies/oil-gas',
                        submenu: null
                      },
                      {
                        label: 'Utilities',
                        url: '/companies/utilities',
                        submenu: null
                      }
                    ]
                  }
                },
                {
                  label: 'Financials',
                  url: '/companies/financials',
                  submenu: {
                    label: null,
                    items: [
                      {
                        label: 'Banks',
                        url: '/companies/banks',
                        submenu: null
                      },
                      {
                        label: 'Insurance',
                        url: '/companies/insurance',
                        submenu: null
                      },
                      {
                        label: 'Property',
                        url: '/companies/property',
                        submenu: null
                      },
                      {
                        label: 'Financial Services',
                        url: '/companies/financial-services',
                        submenu: null
                      }
                    ]
                  }
                },
                {
                  label: 'Health',
                  url: '/companies/health',
                  submenu: {
                    label: null,
                    items: [
                      {
                        label: 'Health Care',
                        url: '/companies/healthcare',
                        submenu: null
                      },
                      {
                        label: 'Pharmaceuticals',
                        url: '/companies/pharmaceuticals',
                        submenu: null
                      }
                    ]
                  }
                },
                {
                  label: 'Industrials',
                  url: '/companies/industrials',
                  submenu: {
                    label: null,
                    items: [
                      {
                        label: 'Aerospace & Defence',
                        url: '/companies/aerospace-defence',
                        submenu: null
                      },
                      {
                        label: 'Automobiles',
                        url: '/companies/automobiles',
                        submenu: null
                      },
                      {
                        label: 'Basic Resources',
                        url: '/companies/basic-resources',
                        submenu: null
                      },
                      {
                        label: 'Chemicals',
                        url: '/companies/chemicals',
                        submenu: null
                      },
                      {
                        label: 'Construction',
                        url: '/companies/construction',
                        submenu: null
                      },
                      {
                        label: 'Industrial Goods',
                        url: '/companies/industrial-goods',
                        submenu: null
                      },
                      {
                        label: 'Support Services',
                        url: '/companies/support-services',
                        submenu: null
                      }
                    ]
                  }
                },
                {
                  label: 'Media',
                  url: '/companies/media',
                  submenu: null
                },
                {
                  label: 'Professional Services',
                  url: '/companies/professional-services',
                  submenu: {
                    label: null,
                    items: [
                      {
                        label: 'Accounting & Consulting Services',
                        url: '/accounting-consulting-services',
                        submenu: null
                      },
                      {
                        label: 'Legal Services',
                        url: '/companies/legal-services',
                        submenu: null
                      },
                      {
                        label: 'Recruitment Services',
                        url: '/companies/recruitment-services',
                        submenu: null
                      }
                    ]
                  }
                },
                {
                  label: 'Retail & Consumer',
                  url: '/companies/retail-consumer',
                  submenu: {
                    label: null,
                    items: [
                      {
                        label: 'Food & Beverage',
                        url: '/companies/food-beverage',
                        submenu: null
                      },
                      {
                        label: 'Luxury Goods',
                        url: '/companies/luxury-goods',
                        submenu: null
                      },
                      {
                        label: 'Personal & Household Goods',
                        url: '/companies/personal-goods',
                        submenu: null
                      },
                      {
                        label: 'Retail',
                        url: '/companies/retail',
                        submenu: null
                      },
                      {
                        label: 'Tobacco',
                        url: '/companies/tobacco',
                        submenu: null
                      },
                      {
                        label: 'Travel & Leisure',
                        url: '/companies/travel-leisure',
                        submenu: null
                      }
                    ]
                  }
                },
                {
                  label: 'Tech Sector',
                  url: '/companies/technology',
                  submenu: null
                },
                {
                  label: 'Telecoms',
                  url: '/companies/telecoms',
                  submenu: null
                },
                {
                  label: 'Transport',
                  url: '/companies/transport',
                  submenu: {
                    label: null,
                    items: [
                      {
                        label: 'Airlines',
                        url: '/companies/airlines',
                        submenu: null
                      },
                      {
                        label: 'Shipping',
                        url: '/companies/shipping',
                        submenu: null
                      },
                      {
                        label: 'Rail',
                        url: '/companies/rail',
                        submenu: null
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            label: 'Tech',
            url: '/technology',
            submenu: null
          },
          {
            label: 'Markets',
            url: '/markets',
            submenu: {
              label: null,
              items: [
                {
                  label: 'fastFT',
                  url: '/fastft',
                  submenu: null
                },
                {
                  label: 'Alphaville',
                  url: 'https://ftalphaville.ft.com',
                  submenu: null
                },
                {
                  label: 'Markets Data',
                  url: 'https://markets.ft.com/data',
                  submenu: null
                },
                {
                  label: 'Capital Markets',
                  url: '/capital-markets',
                  submenu: null
                },
                {
                  label: 'Commodities',
                  url: '/commodities',
                  submenu: {
                    label: null,
                    items: [
                      {
                        label: 'Oil',
                        url: '/oil',
                        submenu: null
                      },
                      {
                        label: 'Gold',
                        url: '/gold',
                        submenu: null
                      },
                      {
                        label: 'Copper',
                        url: '/copper',
                        submenu: null
                      }
                    ]
                  }
                },
                {
                  label: 'Currencies',
                  url: '/currencies',
                  submenu: null
                },
                {
                  label: 'Equities',
                  url: '/equities',
                  submenu: {
                    label: null,
                    items: [
                      {
                        label: 'US Equities',
                        url: '/markets/us',
                        submenu: null
                      },
                      {
                        label: 'UK Equities',
                        url: '/markets/uk',
                        submenu: null
                      },
                      {
                        label: 'European Equities',
                        url: '/markets/europe',
                        submenu: null
                      },
                      {
                        label: 'Asia-Pacific Equities',
                        url: '/markets/asia-pacific',
                        submenu: null
                      }
                    ]
                  }
                },
                {
                  label: 'Fund Management',
                  url: '/fund-management',
                  submenu: {
                    label: null,
                    items: [
                      {
                        label: 'Exchange Traded Funds',
                        url: '/ftfm/etfs',
                        submenu: null
                      },
                      {
                        label: 'Funds Regulation',
                        url: '/fund-regulation',
                        submenu: null
                      },
                      {
                        label: 'Pensions Industry',
                        url: '/pensions-industry',
                        submenu: null
                      }
                    ]
                  }
                },
                {
                  label: 'Trading',
                  url: '/ft-trading-room',
                  submenu: {
                    label: null,
                    items: [
                      {
                        label: 'Clearing & Settlement',
                        url: '/ft-trading-room/clearing-settlement',
                        submenu: null
                      },
                      {
                        label: 'High Frequency Trading',
                        url: '/ft-trading-room/high-frequency-trading',
                        submenu: null
                      },
                      {
                        label: 'Markets Regulation',
                        url: '/financial-markets-regulation',
                        submenu: null
                      },
                      {
                        label: 'OTC markets',
                        url: '/otc-markets',
                        submenu: null
                      },
                      {
                        label: 'Derivatives',
                        url: '/derivatives',
                        submenu: null
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            label: 'Graphics',
            url: '/graphics',
            submenu: null
          },
          {
            label: 'Opinion',
            url: '/opinion',
            submenu: {
              label: null,
              items: [
                {
                  label: 'Columnists',
                  url: '/columnists',
                  submenu: null
                },
                {
                  label: 'The FT View',
                  url: '/ft-view',
                  submenu: null
                },
                {
                  label: 'The Big Read',
                  url: '/the-big-read',
                  submenu: null
                },
                {
                  label: 'Instant Insight',
                  url: '/instant-insight',
                  submenu: null
                },
                {
                  label: 'Lex',
                  url: '/lex',
                  submenu: null
                },
                {
                  label: 'Alphaville',
                  url: 'https://ftalphaville.ft.com',
                  submenu: null
                },
                {
                  label: 'Obituaries',
                  url: '/obituaries',
                  submenu: null
                },
                {
                  label: 'Letters',
                  url: '/letters',
                  submenu: null
                }
              ]
            }
          },
          {
            label: 'Work & Careers',
            url: '/work-careers',
            submenu: {
              label: null,
              items: [
                {
                  label: 'Business School Rankings',
                  url: 'http://rankings.ft.com/businessschoolrankings/rankings',
                  submenu: null
                },
                {
                  label: 'Business Education',
                  url: '/business-education',
                  submenu: {
                    label: null,
                    items: [
                      {
                        label: 'Business School Rankings',
                        url: 'http://rankings.ft.com/businessschoolrankings/rankings',
                        submenu: null
                      }
                    ]
                  }
                },
                {
                  label: 'Entrepreneurship',
                  url: '/entrepreneurship',
                  submenu: null
                },
                {
                  label: 'Recruitment',
                  url: '/recruitment',
                  submenu: null
                },
                {
                  label: 'Business Books',
                  url: '/business-books',
                  submenu: null
                }
              ]
            }
          },
          {
            label: 'Life & Arts',
            url: '/life-arts',
            submenu: {
              label: null,
              items: [
                {
                  label: 'Arts',
                  url: '/arts',
                  submenu: {
                    label: null,
                    items: [
                      {
                        label: 'Architecture',
                        url: '/architecture',
                        submenu: null
                      },
                      {
                        label: 'Collecting',
                        url: '/collecting',
                        submenu: null
                      },
                      {
                        label: 'Dance',
                        url: '/dance',
                        submenu: null
                      },
                      {
                        label: 'Design',
                        url: '/design',
                        submenu: null
                      },
                      {
                        label: 'Film',
                        url: '/film',
                        submenu: null
                      },
                      {
                        label: 'Music',
                        url: '/music',
                        submenu: null
                      },
                      {
                        label: 'Television',
                        url: '/television',
                        submenu: null
                      },
                      {
                        label: 'Theatre',
                        url: '/theatre',
                        submenu: null
                      },
                      {
                        label: 'Visual Arts',
                        url: '/visual-arts',
                        submenu: null
                      }
                    ]
                  }
                },
                {
                  label: 'Books',
                  url: '/books',
                  submenu: {
                    label: null,
                    items: [
                      {
                        label: 'Business Books',
                        url: '/business-books',
                        submenu: null
                      },
                      {
                        label: 'Fiction',
                        url: '/fiction',
                        submenu: null
                      },
                      {
                        label: 'Non-Fiction',
                        url: '/non-fiction',
                        submenu: null
                      }
                    ]
                  }
                },
                {
                  label: 'Food & Drink',
                  url: '/food-drink',
                  submenu: {
                    label: null,
                    items: [
                      {
                        label: 'Wine',
                        url: '/wine',
                        submenu: null
                      },
                      {
                        label: 'Recipes',
                        url: '/recipes',
                        submenu: null
                      },
                      {
                        label: 'Restaurants',
                        url: '/restaurants',
                        submenu: null
                      }
                    ]
                  }
                },
                {
                  label: 'FT Magazine',
                  url: '/magazine',
                  submenu: null
                },
                {
                  label: 'House & Home',
                  url: '/house-home',
                  submenu: null
                },
                {
                  label: 'Next Act',
                  url: '/next-act',
                  submenu: null
                },
                {
                  label: 'Style',
                  url: '/style',
                  submenu: {
                    label: null,
                    items: [
                      {
                        label: 'Fashion shows',
                        url: '/fashion-shows',
                        submenu: null
                      },
                      {
                        label: 'The Art of Fashion',
                        url: '/art-of-fashion',
                        submenu: null
                      }
                    ]
                  }
                },
                {
                  label: 'Travel',
                  url: '/travel',
                  submenu: {
                    label: null,
                    items: [
                      {
                        label: 'Adventure Holidays',
                        url: '/adventure-holidays',
                        submenu: null
                      },
                      {
                        label: 'Cycling Holidays',
                        url: '/cycling-holidays',
                        submenu: null
                      },
                      {
                        label: 'City Breaks',
                        url: '/city-breaks',
                        submenu: null
                      },
                      {
                        label: 'Winter Sports',
                        url: '/winter-sports',
                        submenu: null
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            label: 'Personal Finance',
            url: '/personal-finance',
            submenu: {
              label: null,
              items: [
                {
                  label: 'Property & Mortgages',
                  url: '/personal-finance/property-mortgages',
                  submenu: null
                },
                {
                  label: 'Investments',
                  url: '/personal-finance/investments',
                  submenu: null
                },
                {
                  label: 'Pensions',
                  url: '/pensions',
                  submenu: null
                },
                {
                  label: 'Tax',
                  url: '/personal-finance/tax',
                  submenu: null
                },
                {
                  label: 'Banking & Savings',
                  url: '/personal-finance/banking-savings',
                  submenu: null
                },
                {
                  label: 'Advice & Comment',
                  url: '/personal-finance/advice-commment',
                  submenu: null
                }
              ]
            }
          },
          {
            label: 'Science',
            url: '/companies/science',
            submenu: null
          },
          {
            label: 'Special Reports',
            url: '/special-reports',
            submenu: null
          }
        ]
      }
    },
    {
      label: 'FT recommends',
      url: null,
      submenu: {
        label: null,
        items: [
          {
            label: 'Lex',
            url: '/lex',
            submenu: null
          },
          {
            label: 'Alphaville',
            url: 'https://ftalphaville.ft.com',
            submenu: null
          },
          {
            label: 'EM Squared',
            url: '/emerging-markets/em-squared',
            submenu: null
          },
          {
            label: 'Lunch with the FT',
            url: '/lunch-with-the-ft',
            submenu: null
          },
          {
            label: 'FT Confidential Research',
            url: 'https://www.ft.com/ft-confidential-research',
            submenu: null
          },
          {
            label: 'Video',
            url: '/video',
            submenu: null
          },
          {
            label: 'Podcasts',
            url: 'https://www.ft.com/podcasts',
            submenu: null
          },
          {
            label: 'News feed',
            url: '/news-feed',
            submenu: null
          },
          {
            label: 'Newsletters',
            url: '/newsletters',
            submenu: null
          }
        ]
      }
    },
    {
      label: null,
      url: null,
      submenu: {
        label: null,
        items: [
          {
            label: 'myFT',
            url: '/myft',
            submenu: null
          },
          {
            label: 'Portfolio',
            url: 'https://markets.ft.com/data/portfolio/dashboard',
            submenu: null
          },
          {
            label: "Today's Newspaper (ePaper)",
            url: 'https://www.ft.com/todaysnewspaper',
            submenu: null
          },
          {
            label: 'Crossword',
            url: 'https://www.ft.com/crossword',
            submenu: null
          },
          {
            label: 'Our Apps',
            url: 'https://www.ft.com/tour/apps',
            submenu: null
          }
        ]
      }
    }
  ]
}

export default data
