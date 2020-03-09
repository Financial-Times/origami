import { TNavMenu } from '@financial-times/dotcom-types-navigation'

const data: TNavMenu = {
  label: 'User',
  items: [
    { label: 'Help Centre', url: 'http://help.ft.com', submenu: null },
    { label: 'Account Settings', url: 'https://www.ft.com/myaccount', submenu: null },
    { label: 'Contact Preferences', url: '/myft/alerts', submenu: null },
    { label: 'Sign Out', url: '/logout', submenu: null }
  ]
}

export default data
