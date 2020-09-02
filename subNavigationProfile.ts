import { TNavMenuItem } from '@financial-times/dotcom-types-navigation'

const item: TNavMenuItem = {
  label: 'Settings & Account',
  url: '/myaccount/personal-details',
  selected: true,
  submenu: null
}

const siblings: TNavMenuItem[] = []

const children: TNavMenuItem[] = [
  {
    label: 'Personal Details',
    url: '/myaccount/personal-details',
    submenu: null
  },
  {
    label: 'Licence',
    url: '/myaccount/licence',
    submenu: null
  }
]

const ancestors: TNavMenuItem[] = []

export default { item, siblings, children, ancestors }
