import React from  'react';
import {Redirect} from 'react-router';
import EmployeesPage from './pages/EmployeesPage';
import SectionLayout from './components/SectionLayout';

export default {
  manage: {
    path: '/manage',
    exact: true,
    component: _ => <Redirect to="/manage/employees"/>
  },
  employees: {
    path: '/manage/employees',
    exact: true,
    component: EmployeesPage,
    layout: SectionLayout
  },
  test: {
    path: '/manage/test',
    exact: true,
    component: () => (<div>Test</div>),
    layout: SectionLayout
  }
};
