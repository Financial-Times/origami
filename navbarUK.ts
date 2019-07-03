import { TNavMenu } from '@financial-times/dotcom-types-navigation'

const data: TNavMenu = {
  label: 'Navigation',
  items: [
    { label: 'Home', url: '/', submenu: null },
    {
      label: 'World',
      url: '/world',
      selected: true,
      submenu: {
        label: null,
        items: [
          { label: 'Global Economy', url: '/global-economy', submenu: null },
          {
            label: 'UK',
            url: '/world/uk',
            submenu: {
              label: null,
              items: [
                { label: 'UK Business & Economy', url: '/uk-business-economy', submenu: null },
                { label: 'UK Politics & Policy', url: '/world/uk/politics', submenu: null },
                { label: 'UK Companies', url: '/companies/uk', submenu: null }
              ]
            }
          },
          {
            label: 'US',
            url: '/world/us',
            submenu: {
              label: null,
              items: [
                { label: 'US Economy', url: '/us-economy', submenu: null },
                { label: 'US Politics & Policy', url: '/world/us/politics', submenu: null },
                { label: 'US Companies', url: '/companies/us', submenu: null }
              ]
            }
          },
          {
            label: 'China',
            url: '/world/asia-pacific/china',
            submenu: {
              label: null,
              items: [
                { label: 'Chinese Economy', url: '/chinese-economy', submenu: null },
                { label: 'China Politics & Policy', url: '/chinese-politics-policy', submenu: null }
              ]
            }
          },
          { label: 'Africa', url: '/world/africa', submenu: null },
          { label: 'Asia Pacific', url: '/world/asia-pacific', submenu: null },
          { label: 'Emerging Markets', url: '/emerging-markets', submenu: null },
          { label: 'Europe', url: '/world/europe', submenu: null },
          { label: 'Americas', url: '/world/americas', submenu: null },
          { label: 'Middle East and North Africa', url: '/world/mideast', submenu: null }
        ]
      },
      meganav: [
        {
          component: 'sectionlist',
          dataset: 'subsections',
          title: 'Sections',
          data: [
            [
              { label: 'World Home', url: '/world' },
              { label: 'Global Economy', url: '/global-economy', submenu: null },
              {
                label: 'UK',
                url: '/world/uk',
                submenu: {
                  label: null,
                  items: [
                    { label: 'UK Business & Economy', url: '/uk-business-economy', submenu: null },
                    { label: 'UK Politics & Policy', url: '/world/uk/politics', submenu: null },
                    { label: 'UK Companies', url: '/companies/uk', submenu: null }
                  ]
                }
              },
              {
                label: 'US',
                url: '/world/us',
                submenu: {
                  label: null,
                  items: [
                    { label: 'US Economy', url: '/us-economy', submenu: null },
                    { label: 'US Politics & Policy', url: '/world/us/politics', submenu: null },
                    { label: 'US Companies', url: '/companies/us', submenu: null }
                  ]
                }
              },
              {
                label: 'China',
                url: '/world/asia-pacific/china',
                submenu: {
                  label: null,
                  items: [
                    { label: 'Chinese Economy', url: '/chinese-economy', submenu: null },
                    { label: 'China Politics & Policy', url: '/chinese-politics-policy', submenu: null }
                  ]
                }
              },
              { label: 'Africa', url: '/world/africa', submenu: null }
            ],
            [
              { label: 'Asia Pacific', url: '/world/asia-pacific', submenu: null },
              { label: 'Emerging Markets', url: '/emerging-markets', submenu: null },
              { label: 'Europe', url: '/world/europe', submenu: null },
              { label: 'Americas', url: '/world/americas', submenu: null },
              { label: 'Middle East and North Africa', url: '/world/mideast', submenu: null }
            ]
          ]
        },
        {
          component: 'articlelist',
          dataset: 'popular',
          title: 'Most Read',
          data: [
            {
              label: 'Oxford college in turmoil over priestly pay row',
              url: '/content/25120d10-3e55-11e9-b896-fe36ec32aece'
            },
            {
              label: 'Liam Fox’s trade department cancels Brexit briefings with business',
              url: '/content/25b1eb3e-3e85-11e9-9bee-efab61506f44'
            },
            {
              label: 'Imran Khan recast as statesman after deft touch eases India crisis',
              url: '/content/e9cb9b78-3e5d-11e9-b896-fe36ec32aece'
            },
            {
              label: 'Macron lays out proposals for a more ‘protective’ EU',
              url: '/content/bb07cca4-3e93-11e9-b896-fe36ec32aece'
            },
            {
              label: 'Northern Ireland is warned of ‘grave’ impact of a no-deal Brexit',
              url: '/content/bf3a6a2a-3f51-11e9-b896-fe36ec32aece'
            }
          ]
        }
      ]
    },
    {
      label: 'UK',
      url: '/world/uk',
      submenu: {
        label: null,
        items: [
          { label: 'UK Business & Economy', url: '/uk-business-economy', submenu: null },
          { label: 'UK Politics & Policy', url: '/world/uk/politics', submenu: null },
          { label: 'UK Companies', url: '/companies/uk', submenu: null }
        ]
      },
      meganav: [
        {
          component: 'sectionlist',
          dataset: 'subsections',
          title: 'Sections',
          data: [
            [
              { label: 'UK Home', url: '/world/uk' },
              { label: 'UK Business & Economy', url: '/uk-business-economy', submenu: null }
            ],
            [
              { label: 'UK Politics & Policy', url: '/world/uk/politics', submenu: null },
              { label: 'UK Companies', url: '/companies/uk', submenu: null }
            ]
          ]
        },
        {
          component: 'articlelist',
          dataset: 'popular',
          title: 'Most Read',
          data: [
            {
              label: 'Oxford college in turmoil over priestly pay row',
              url: '/content/25120d10-3e55-11e9-b896-fe36ec32aece'
            },
            {
              label: 'UK attorney-general makes last-ditch bid to end backstop impasse',
              url: '/content/af5992a2-3ea2-11e9-9bee-efab61506f44'
            },
            {
              label: 'Hammond faces reconciling a two-sided UK economy',
              url: '/content/83878bac-3e84-11e9-9bee-efab61506f44'
            },
            {
              label: 'Barclays banker unwilling to ‘take a hit’ to save top execs',
              url: '/content/301b461c-3e97-11e9-9bee-efab61506f44'
            },
            {
              label: 'UK consumers hold off on spending over Brexit worries',
              url: '/content/bf293834-3e72-11e9-9bee-efab61506f44'
            }
          ]
        }
      ]
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
                { label: 'Mining', url: '/companies/mining', submenu: null },
                { label: 'Oil & Gas', url: '/companies/oil-gas', submenu: null },
                { label: 'Utilities', url: '/companies/utilities', submenu: null }
              ]
            }
          },
          {
            label: 'Financials',
            url: '/companies/financials',
            submenu: {
              label: null,
              items: [
                { label: 'Banks', url: '/companies/banks', submenu: null },
                { label: 'Insurance', url: '/companies/insurance', submenu: null },
                { label: 'Property', url: '/companies/property', submenu: null },
                { label: 'Financial Services', url: '/companies/financial-services', submenu: null }
              ]
            }
          },
          {
            label: 'Health',
            url: '/companies/health',
            submenu: {
              label: null,
              items: [
                { label: 'Health Care', url: '/companies/healthcare', submenu: null },
                { label: 'Pharmaceuticals', url: '/companies/pharmaceuticals', submenu: null }
              ]
            }
          },
          {
            label: 'Industrials',
            url: '/companies/industrials',
            submenu: {
              label: null,
              items: [
                { label: 'Aerospace & Defence', url: '/companies/aerospace-defence', submenu: null },
                { label: 'Automobiles', url: '/companies/automobiles', submenu: null },
                { label: 'Basic Resources', url: '/companies/basic-resources', submenu: null },
                { label: 'Chemicals', url: '/companies/chemicals', submenu: null },
                { label: 'Construction', url: '/companies/construction', submenu: null },
                { label: 'Industrial Goods', url: '/companies/industrial-goods', submenu: null },
                { label: 'Support Services', url: '/companies/support-services', submenu: null }
              ]
            }
          },
          { label: 'Media', url: '/companies/media', submenu: null },
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
                { label: 'Legal Services', url: '/companies/legal-services', submenu: null },
                { label: 'Recruitment Services', url: '/companies/recruitment-services', submenu: null }
              ]
            }
          },
          {
            label: 'Retail & Consumer',
            url: '/companies/retail-consumer',
            submenu: {
              label: null,
              items: [
                { label: 'Food & Beverage', url: '/companies/food-beverage', submenu: null },
                { label: 'Luxury Goods', url: '/companies/luxury-goods', submenu: null },
                {
                  label: 'Personal & Household Goods',
                  url: '/companies/personal-goods',
                  submenu: null
                },
                { label: 'Retail', url: '/companies/retail', submenu: null },
                { label: 'Tobacco', url: '/companies/tobacco', submenu: null },
                { label: 'Travel & Leisure', url: '/companies/travel-leisure', submenu: null }
              ]
            }
          },
          { label: 'Tech Sector', url: '/companies/technology', submenu: null },
          { label: 'Telecoms', url: '/companies/telecoms', submenu: null },
          {
            label: 'Transport',
            url: '/companies/transport',
            submenu: {
              label: null,
              items: [
                { label: 'Airlines', url: '/companies/airlines', submenu: null },
                { label: 'Shipping', url: '/companies/shipping', submenu: null },
                { label: 'Rail', url: '/companies/rail', submenu: null }
              ]
            }
          }
        ]
      },
      meganav: [
        {
          component: 'sectionlist',
          dataset: 'subsections',
          title: 'Sections',
          data: [
            [
              { label: 'Companies Home', url: '/companies' },
              {
                label: 'Energy',
                url: '/companies/energy',
                submenu: {
                  label: null,
                  items: [
                    { label: 'Mining', url: '/companies/mining', submenu: null },
                    { label: 'Oil & Gas', url: '/companies/oil-gas', submenu: null },
                    { label: 'Utilities', url: '/companies/utilities', submenu: null }
                  ]
                }
              },
              {
                label: 'Financials',
                url: '/companies/financials',
                submenu: {
                  label: null,
                  items: [
                    { label: 'Banks', url: '/companies/banks', submenu: null },
                    { label: 'Insurance', url: '/companies/insurance', submenu: null },
                    { label: 'Property', url: '/companies/property', submenu: null },
                    { label: 'Financial Services', url: '/companies/financial-services', submenu: null }
                  ]
                }
              },
              {
                label: 'Health',
                url: '/companies/health',
                submenu: {
                  label: null,
                  items: [
                    { label: 'Health Care', url: '/companies/healthcare', submenu: null },
                    { label: 'Pharmaceuticals', url: '/companies/pharmaceuticals', submenu: null }
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
                    { label: 'Automobiles', url: '/companies/automobiles', submenu: null },
                    { label: 'Basic Resources', url: '/companies/basic-resources', submenu: null },
                    { label: 'Chemicals', url: '/companies/chemicals', submenu: null },
                    { label: 'Construction', url: '/companies/construction', submenu: null },
                    { label: 'Industrial Goods', url: '/companies/industrial-goods', submenu: null },
                    { label: 'Support Services', url: '/companies/support-services', submenu: null }
                  ]
                }
              },
              { label: 'Media', url: '/companies/media', submenu: null }
            ],
            [
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
                    { label: 'Legal Services', url: '/companies/legal-services', submenu: null },
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
                    { label: 'Food & Beverage', url: '/companies/food-beverage', submenu: null },
                    { label: 'Luxury Goods', url: '/companies/luxury-goods', submenu: null },
                    {
                      label: 'Personal & Household Goods',
                      url: '/companies/personal-goods',
                      submenu: null
                    },
                    { label: 'Retail', url: '/companies/retail', submenu: null },
                    { label: 'Tobacco', url: '/companies/tobacco', submenu: null },
                    { label: 'Travel & Leisure', url: '/companies/travel-leisure', submenu: null }
                  ]
                }
              },
              { label: 'Tech Sector', url: '/companies/technology', submenu: null },
              { label: 'Telecoms', url: '/companies/telecoms', submenu: null },
              {
                label: 'Transport',
                url: '/companies/transport',
                submenu: {
                  label: null,
                  items: [
                    { label: 'Airlines', url: '/companies/airlines', submenu: null },
                    { label: 'Shipping', url: '/companies/shipping', submenu: null },
                    { label: 'Rail', url: '/companies/rail', submenu: null }
                  ]
                }
              }
            ]
          ]
        },
        {
          component: 'articlelist',
          dataset: 'popular',
          title: 'Most Read',
          data: [
            {
              label: 'Toyota warns no-deal Brexit threatens building new models in UK',
              url: '/content/368a3b68-3ea4-11e9-9bee-efab61506f44'
            },
            {
              label: 'Why Ford is stalling in China while Toyota succeeds',
              url: '/content/6fd5a4c4-36c1-11e9-bd3a-8b2a211d90d5'
            },
            {
              label: 'Blackstone slaps golden handcuffs on Bennett Goodman',
              url: '/content/968c0622-3f62-11e9-b896-fe36ec32aece'
            },
            {
              label: 'Volvo Cars caps vehicle speed to prevent road deaths',
              url: '/content/3c2f66bc-3e61-11e9-9bee-efab61506f44'
            },
            {
              label: 'AB InBev to replace chair amid conflict of interest concerns',
              url: '/content/72c8da12-3f67-11e9-b896-fe36ec32aece'
            }
          ]
        }
      ]
    },
    { label: 'Tech', url: '/technology', submenu: null },
    {
      label: 'Markets',
      url: '/markets',
      submenu: {
        label: null,
        items: [
          { label: 'fastFT', url: '/fastft', submenu: null },
          { label: 'Alphaville', url: 'https://ftalphaville.ft.com', submenu: null },
          { label: 'Markets Data', url: 'https://markets.ft.com/data', submenu: null },
          { label: 'Capital Markets', url: '/capital-markets', submenu: null },
          {
            label: 'Commodities',
            url: '/commodities',
            submenu: {
              label: null,
              items: [
                { label: 'Oil', url: '/oil', submenu: null },
                { label: 'Gold', url: '/gold', submenu: null },
                { label: 'Copper', url: '/copper', submenu: null }
              ]
            }
          },
          { label: 'Currencies', url: '/currencies', submenu: null },
          {
            label: 'Equities',
            url: '/equities',
            submenu: {
              label: null,
              items: [
                { label: 'US Equities', url: '/markets/us', submenu: null },
                { label: 'UK Equities', url: '/markets/uk', submenu: null },
                { label: 'European Equities', url: '/markets/europe', submenu: null },
                { label: 'Asia-Pacific Equities', url: '/markets/asia-pacific', submenu: null }
              ]
            }
          },
          {
            label: 'Fund Management',
            url: '/fund-management',
            submenu: {
              label: null,
              items: [
                { label: 'Exchange Traded Funds', url: '/ftfm/etfs', submenu: null },
                { label: 'Funds Regulation', url: '/fund-regulation', submenu: null },
                { label: 'Pensions Industry', url: '/pensions-industry', submenu: null }
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
                { label: 'Markets Regulation', url: '/financial-markets-regulation', submenu: null },
                { label: 'OTC markets', url: '/otc-markets', submenu: null },
                { label: 'Derivatives', url: '/derivatives', submenu: null }
              ]
            }
          }
        ]
      },
      meganav: [
        {
          component: 'sectionlist',
          dataset: 'subsections',
          title: 'Sections',
          data: [
            [
              { label: 'Markets Home', url: '/markets' },
              { label: 'fastFT', url: '/fastft', submenu: null },
              { label: 'Alphaville', url: 'https://ftalphaville.ft.com', submenu: null },
              { label: 'Markets Data', url: 'https://markets.ft.com/data', submenu: null },
              { label: 'Capital Markets', url: '/capital-markets', submenu: null }
            ],
            [
              {
                label: 'Commodities',
                url: '/commodities',
                submenu: {
                  label: null,
                  items: [
                    { label: 'Oil', url: '/oil', submenu: null },
                    { label: 'Gold', url: '/gold', submenu: null },
                    { label: 'Copper', url: '/copper', submenu: null }
                  ]
                }
              },
              { label: 'Currencies', url: '/currencies', submenu: null },
              {
                label: 'Equities',
                url: '/equities',
                submenu: {
                  label: null,
                  items: [
                    { label: 'US Equities', url: '/markets/us', submenu: null },
                    { label: 'UK Equities', url: '/markets/uk', submenu: null },
                    { label: 'European Equities', url: '/markets/europe', submenu: null },
                    { label: 'Asia-Pacific Equities', url: '/markets/asia-pacific', submenu: null }
                  ]
                }
              },
              {
                label: 'Fund Management',
                url: '/fund-management',
                submenu: {
                  label: null,
                  items: [
                    { label: 'Exchange Traded Funds', url: '/ftfm/etfs', submenu: null },
                    { label: 'Funds Regulation', url: '/fund-regulation', submenu: null },
                    { label: 'Pensions Industry', url: '/pensions-industry', submenu: null }
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
                    { label: 'OTC markets', url: '/otc-markets', submenu: null },
                    { label: 'Derivatives', url: '/derivatives', submenu: null }
                  ]
                }
              }
            ]
          ]
        },
        {
          component: 'articlelist',
          dataset: 'popular',
          title: 'Most Read',
          data: [
            {
              label: 'BoE sets up facility to buffer banks in event of chaotic Brexit',
              url: '/content/0786731e-3f2a-11e9-9bee-efab61506f44'
            },
            {
              label: 'Why Ford is stalling in China while Toyota succeeds',
              url: '/content/6fd5a4c4-36c1-11e9-bd3a-8b2a211d90d5'
            },
            {
              label: 'Stocks surge but many investors sit it out on the sidelines',
              url: '/content/44cb8fb0-3c47-11e9-b72b-2c7f526ca5d0'
            },
            {
              label: 'The US strategy is not the best way to deal with Huawei',
              url: '/content/3d489be2-3e73-11e9-9499-290979c9807a'
            },
            {
              label: 'Fundraising drought suggests nerves over Brexit',
              url: '/content/a67767ba-3e78-11e9-b896-fe36ec32aece'
            }
          ]
        }
      ]
    },
    { label: 'Graphics', url: '/graphics', submenu: null },
    {
      label: 'Opinion',
      url: '/opinion',
      submenu: {
        label: null,
        items: [
          { label: 'Columnists', url: '/columnists', submenu: null },
          { label: 'The FT View', url: '/ft-view', submenu: null },
          { label: 'The Big Read', url: '/the-big-read', submenu: null },
          { label: 'Instant Insight', url: '/instant-insight', submenu: null },
          { label: 'Lex', url: '/lex', submenu: null },
          { label: 'Alphaville', url: 'https://ftalphaville.ft.com', submenu: null },
          { label: 'Obituaries', url: '/obituaries', submenu: null },
          { label: 'Letters', url: '/letters', submenu: null }
        ]
      },
      meganav: [
        {
          component: 'sectionlist',
          dataset: 'subsections',
          title: 'Sections',
          data: [
            [
              { label: 'Opinion Home', url: '/opinion' },
              { label: 'Columnists', url: '/columnists', submenu: null },
              { label: 'The FT View', url: '/ft-view', submenu: null },
              { label: 'The Big Read', url: '/the-big-read', submenu: null },
              { label: 'Instant Insight', url: '/instant-insight', submenu: null }
            ],
            [
              { label: 'Lex', url: '/lex', submenu: null },
              { label: 'Alphaville', url: 'https://ftalphaville.ft.com', submenu: null },
              { label: 'Obituaries', url: '/obituaries', submenu: null },
              { label: 'Letters', url: '/letters', submenu: null }
            ]
          ]
        },
        {
          component: 'articlelist',
          dataset: 'popular',
          title: 'Most Read',
          data: [
            {
              label: 'Brexiters are refusing to accept their victory',
              url: '/content/f2e35268-3e68-11e9-9bee-efab61506f44'
            },
            {
              label: 'China, India and the rise of the ‘civilisation state’',
              url: '/content/b6bc9ac2-3e5b-11e9-9bee-efab61506f44'
            },
            {
              label: 'Aviva/Maurice Tulloch: route master',
              url: '/content/6cd8d6f6-3e7d-11e9-9bee-efab61506f44'
            },
            {
              label: 'The US strategy is not the best way to deal with Huawei',
              url: '/content/3d489be2-3e73-11e9-9499-290979c9807a'
            },
            {
              label: 'Quantitative easing was the father of millennial socialism',
              url: '/content/cbed81fc-3b56-11e9-9988-28303f70fcff'
            }
          ]
        }
      ]
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
          { label: 'Entrepreneurship', url: '/entrepreneurship', submenu: null },
          { label: 'Recruitment', url: '/recruitment', submenu: null },
          { label: 'Business Books', url: '/business-books', submenu: null }
        ]
      },
      meganav: [
        {
          component: 'sectionlist',
          dataset: 'subsections',
          title: 'Sections',
          data: [
            [
              { label: 'Work & Careers Home', url: '/work-careers' },
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
              }
            ],
            [
              { label: 'Entrepreneurship', url: '/entrepreneurship', submenu: null },
              { label: 'Recruitment', url: '/recruitment', submenu: null },
              { label: 'Business Books', url: '/business-books', submenu: null }
            ]
          ]
        },
        {
          component: 'articlelist',
          dataset: 'popular',
          title: 'Most Read',
          data: [
            {
              label: 'Does social status still matter when you reach a certain age?',
              url: '/content/d936d5ba-39c7-11e9-b72b-2c7f526ca5d0'
            },
            {
              label: 'Why do so many incompetent men win at work?',
              url: '/content/3641f914-3433-11e9-bb0c-42459962a812'
            },
            {
              label: 'How family dysfunction can help drive career success',
              url: '/content/0671b07a-0e9b-11e9-b2f2-f4c566a4fc5f'
            },
            {
              label: 'Sultan Al Jaber: changing the mindset of a 50-year-old institution',
              url: '/content/48884808-3a73-11e9-b72b-2c7f526ca5d0'
            },
            {
              label: '‘Hold bag? No way. That is what I call a cattle-class error’',
              url: '/content/905152fc-39f0-11e9-b72b-2c7f526ca5d0'
            }
          ]
        }
      ]
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
                { label: 'Architecture', url: '/architecture', submenu: null },
                { label: 'Collecting', url: '/collecting', submenu: null },
                { label: 'Dance', url: '/dance', submenu: null },
                { label: 'Design', url: '/design', submenu: null },
                { label: 'Film', url: '/film', submenu: null },
                { label: 'Music', url: '/music', submenu: null },
                { label: 'Television', url: '/television', submenu: null },
                { label: 'Theatre', url: '/theatre', submenu: null },
                { label: 'Visual Arts', url: '/visual-arts', submenu: null }
              ]
            }
          },
          {
            label: 'Books',
            url: '/books',
            submenu: {
              label: null,
              items: [
                { label: 'Business Books', url: '/business-books', submenu: null },
                { label: 'Fiction', url: '/fiction', submenu: null },
                { label: 'Non-Fiction', url: '/non-fiction', submenu: null }
              ]
            }
          },
          {
            label: 'Food & Drink',
            url: '/food-drink',
            submenu: {
              label: null,
              items: [
                { label: 'Wine', url: '/wine', submenu: null },
                { label: 'Recipes', url: '/recipes', submenu: null },
                { label: 'Restaurants', url: '/restaurants', submenu: null }
              ]
            }
          },
          { label: 'FT Magazine', url: '/magazine', submenu: null },
          { label: 'House & Home', url: '/house-home', submenu: null },
          { label: 'Next Act', url: '/next-act', submenu: null },
          {
            label: 'Style',
            url: '/style',
            submenu: {
              label: null,
              items: [
                { label: 'Fashion shows', url: '/fashion-shows', submenu: null },
                { label: 'The Art of Fashion', url: '/art-of-fashion', submenu: null }
              ]
            }
          },
          {
            label: 'Travel',
            url: '/travel',
            submenu: {
              label: null,
              items: [
                { label: 'Adventure Holidays', url: '/adventure-holidays', submenu: null },
                { label: 'Cycling Holidays', url: '/cycling-holidays', submenu: null },
                { label: 'City Breaks', url: '/city-breaks', submenu: null },
                { label: 'Winter Sports', url: '/winter-sports', submenu: null }
              ]
            }
          }
        ]
      },
      meganav: [
        {
          component: 'sectionlist',
          dataset: 'subsections',
          title: 'Sections',
          data: [
            [
              { label: 'Life & Arts Home', url: '/life-arts' },
              {
                label: 'Arts',
                url: '/arts',
                submenu: {
                  label: null,
                  items: [
                    { label: 'Architecture', url: '/architecture', submenu: null },
                    { label: 'Collecting', url: '/collecting', submenu: null },
                    { label: 'Dance', url: '/dance', submenu: null },
                    { label: 'Design', url: '/design', submenu: null },
                    { label: 'Film', url: '/film', submenu: null },
                    { label: 'Music', url: '/music', submenu: null },
                    { label: 'Television', url: '/television', submenu: null },
                    { label: 'Theatre', url: '/theatre', submenu: null },
                    { label: 'Visual Arts', url: '/visual-arts', submenu: null }
                  ]
                }
              },
              {
                label: 'Books',
                url: '/books',
                submenu: {
                  label: null,
                  items: [
                    { label: 'Business Books', url: '/business-books', submenu: null },
                    { label: 'Fiction', url: '/fiction', submenu: null },
                    { label: 'Non-Fiction', url: '/non-fiction', submenu: null }
                  ]
                }
              },
              {
                label: 'Food & Drink',
                url: '/food-drink',
                submenu: {
                  label: null,
                  items: [
                    { label: 'Wine', url: '/wine', submenu: null },
                    { label: 'Recipes', url: '/recipes', submenu: null },
                    { label: 'Restaurants', url: '/restaurants', submenu: null }
                  ]
                }
              },
              { label: 'FT Magazine', url: '/magazine', submenu: null }
            ],
            [
              { label: 'House & Home', url: '/house-home', submenu: null },
              { label: 'Next Act', url: '/next-act', submenu: null },
              {
                label: 'Style',
                url: '/style',
                submenu: {
                  label: null,
                  items: [
                    { label: 'Fashion shows', url: '/fashion-shows', submenu: null },
                    { label: 'The Art of Fashion', url: '/art-of-fashion', submenu: null }
                  ]
                }
              },
              {
                label: 'Travel',
                url: '/travel',
                submenu: {
                  label: null,
                  items: [
                    { label: 'Adventure Holidays', url: '/adventure-holidays', submenu: null },
                    { label: 'Cycling Holidays', url: '/cycling-holidays', submenu: null },
                    { label: 'City Breaks', url: '/city-breaks', submenu: null },
                    { label: 'Winter Sports', url: '/winter-sports', submenu: null }
                  ]
                }
              }
            ]
          ]
        },
        {
          component: 'articlelist',
          dataset: 'popular',
          title: 'Most Read',
          data: [
            {
              label: 'The fallen superpower: US foreign policy from triumph to hubris',
              url: '/content/34bbaa0e-3e79-11e9-9bee-efab61506f44'
            },
            {
              label: 'Chanel AW19 — Karl Lagerfeld’s last show',
              url: '/content/754c40be-3f47-11e9-9bee-efab61506f44'
            },
            {
              label: 'How FC Barcelona are preparing for the future of football',
              url: '/content/908752aa-3a1b-11e9-b72b-2c7f526ca5d0'
            },
            {
              label: 'Simon Schama: When Britain chose Europe',
              url: '/content/68c8efa8-39df-11e9-b72b-2c7f526ca5d0'
            },
            {
              label: 'My First Million: Victoria Robertshaw, founder Keelham Farm Shop',
              url: '/content/afc6466e-33b1-11e9-9be1-7dc6e2dfa65e'
            }
          ]
        }
      ]
    },
    { label: 'How to Spend It', url: 'https://howtospendit.ft.com/', submenu: null }
  ]
}

export default data
