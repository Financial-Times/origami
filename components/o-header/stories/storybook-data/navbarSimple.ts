import { TNavMenu } from '@financial-times/dotcom-types-navigation'

const data: TNavMenu = {
  label: 'Navigation',
  items: [
    {
      label: 'Home',
      url: '/',
      submenu: null
    },
    {
      label: 'fastFT',
      url: '/fastft',
      submenu: null
    },
    {
      label: 'Markets Data',
      url: 'https://markets.ft.com/data',
      submenu: null
    }
  ]
}

export default data
