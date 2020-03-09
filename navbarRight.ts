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
      url: 'https://www.ft.com/myaccount',
      submenu: null
    }
  ]
}

export default data
