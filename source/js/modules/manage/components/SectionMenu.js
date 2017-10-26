import React from 'react'
import SectionLink from './SectionLink'

const SectionMenu = ({children}) => (
  <div className="title_panel">
    {children}
    <div className="tabs_flat  tabs_flat__h1">
      <SectionLink to="/manage/employees" label="Сотрудники"/>
      <SectionLink to="/manage/test" label="Тест"/>
    </div>
  </div>
);

export default SectionMenu;