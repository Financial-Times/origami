import anon from './anon'
import drawerUK from './drawerUK'
import actionsUK from './actionsUK'
import editionsUK from './editionsUK'
import navbarRight from './navbarRight'
import navbarRightAnon from './navbarRightAnon'
import navbarSimple from './navbarSimple'
import navbarUK from './navbarUK'
import subNavigation from './subNavigationUK'
import user from './user'

import { THeaderProps } from '../../interfaces'

const breadcrumb = subNavigation.ancestors.concat(subNavigation.item)
const subsections = subNavigation.children

const data: THeaderProps = {
  userIsAnonymous: false,
  userIsLoggedIn: true,
  showSubNavigation: true,
  showUserNavigation: false,
  showStickyHeader: true,
  data: {
    account: null,
    anon,
    breadcrumb,
    drawer: drawerUK,
    actions: actionsUK,
    editions: editionsUK,
    footer: null,
    navbar: navbarUK,
    'navbar-right': navbarRight,
    'navbar-right-anon': navbarRightAnon,
    'navbar-simple': navbarSimple,
    subsections,
    'subsections-right': [],
    user
  }
}

export default data
