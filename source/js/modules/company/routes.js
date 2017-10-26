import React from  'react';
import {Redirect} from 'react-router';
import CompaniesPage from './pages/CompaniesPage';
import SectionLayout from './components/SectionLayout';

export default {
  employees: {
    path: '/companies',
    exact: true,
    component: CompaniesPage,
    layout: SectionLayout,
    allowAnonymous: true
  }
};
