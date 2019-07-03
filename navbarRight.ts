import { TNavMenu } from '@financial-times/dotcom-types-navigation'

const data: TNavMenu = {
  label: 'Navigation',
  items: [
    {
      label: 'Portfolio',
      url: 'https://markets.ft.com/data/portfolio/dashboard',
      submenu: null
    },
    {
      label: 'Account Settings',
      url: 'https://myaccount.ft.com/details/core/view',
      submenu: null
    }
  ]
}

export default data
