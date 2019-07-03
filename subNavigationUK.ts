import { TNavMenuItem } from '@financial-times/dotcom-types-navigation'

const item: TNavMenuItem = {
  label: 'UK',
  url: '/world/uk',
  selected: true,
  submenu: null
}

const siblings: TNavMenuItem[] = []

const children: TNavMenuItem[] = [
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

const ancestors: TNavMenuItem[] = [
  {
    label: 'World',
    url: '/world'
  }
]

export default { item, siblings, children, ancestors }
