import React from 'react';
import {observer, inject} from 'mobx-react';
import {InfinateScroll, SortLink} from 'common/ui'
import {DateFormat, AmountFormat, LoaderPanel} from 'modul-components'
import {ContentPopup} from 'modul-components/lib/dialogs'

@observer
class CompanySearch extends React.Component {

  render() {
    const {className}=this.props;
    return (<div className={className}>

    </div>)
  }
}


export default CompanySearch;