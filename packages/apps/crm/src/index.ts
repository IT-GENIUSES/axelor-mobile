import {Module} from '@axelor/aos-mobile-core';
import LeadScreens from './screens/lead';
import ProspectScreens from './screens/prospect';
import OpportunityScreens from './screens/opportunity';
import ContactScreens from './screens/contact/';
import ClientScreens from './screens/client';
import CatalogScreen from './screens/catalog';
import enTranslations from './i18n/en.json';
import frTranslations from './i18n/fr.json';
import * as crmReducers from './features';

export const CrmModule: Module = {
  name: 'Crm',
  title: 'Crm_Crm',
  subtitle: 'Crm_Crm',
  icon: 'users',
  menus: {
    Leads: {
      title: 'Crm_Leads',
      icon: 'address-card',
      screen: 'LeadListScreen',
    },
    Prospects: {
      title: 'Crm_Prospects',
      icon: 'user-tie',
      screen: 'ProspectsListScreen',
    },
    Opportunities: {
      title: 'Crm_Opportunities',
      icon: 'search-dollar',
      screen: 'OpportunityListScreen',
    },
    Clients: {
      title: 'Crm_Clients',
      icon: 'users',
      screen: 'ClientsListScreen',
    },
    Contact: {
      title: 'Crm_Contacts',
      icon: 'address-book',
      screen: 'ContactListScreen',
    },
    Catalog: {
      title: 'Crm_Catalogs',
      icon: 'swatchbook',
      screen: 'CatalogListScreen',
    },
  },
  screens: {
    ...LeadScreens,
    ...ProspectScreens,
    ...OpportunityScreens,
    ...ClientScreens,
    ...ContactScreens,
    ...CatalogScreen,
  },
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  reducers: {...crmReducers},
};

export * from './types';
export * from './components';
export * from './api';
export * from './features/asyncFunctions-index';

export * from './screens/lead';
export * from './screens/prospect';
export * from './screens/opportunity';
export * from './screens/client';