import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import toJs from 'components/HOC/toJs'
import retailPointHOC from 'components/HOC/retailPointRequiredHOC'
import CashBoxTabs from '../components/CashBoxTabs'
import CashBoxToolbar from '../components/CashBoxToolbar'
import CashBoxHotKeys from '../components/CashBoxHotKeys'
import LoaderBlock from 'common/uiElements/LoaderBlock'
import HotKeyEditor from '../components/HotKeyEditor'
import * as tabSelector from '../selectors/tabSelector'
import * as actions from '../actions/actionTypes'
import {getCordsMask, isValidCord} from '../helpers/hotKeyHelper'
import {isValid, change, initialize, formValueSelector, focus} from 'redux-form/immutable'

class CashBoxContainer extends React.Component {
    constructor(props) {
        super(props);
        const gridSize = {width: 10, height: 3};
        this.state = {popupPosition: null, gridSize};
    }

    handleAddTab() {
        this.props.newTab();
    }

    handleSelectTab(code) {
        this.props.selectTab({code});
    }

    handleRemoveTab() {
        const code = this.props.activeTab.code;
        this.props.removeTab({code});
    }

    handleSaveToolbar(form) {
        if (form) {
            this.props.updateTab({tab: form.toJS()});
        }
    }

    handleSelectEmptyKey(event, cords) {
        this.props.addKey({cords, tabCode: this.props.activeTab.code});
        this.handleOpenPopup(event.target);
    }

    handleGoBackFromCategory() {
        const tabCode = this.props.activeTab.code;
        this.props.backFromCategory({tabCode})
    }

    handleOpenCategory(event, {tabCode, categoryId}) {
        this.props.openCategory({categoryId, gridSize: this.state.gridSize, tabCode});
        event.preventDefault();
        event.stopPropagation();
    }

    handleSelectProduct(event, id) {
        this.props.selectKey({id});
        this.handleOpenPopup(event.target);
    }

    calcPopupPosition(el) {
        const popupWidth = 415;
        const popupHeight = 500;
        const keyBox = el.getBoundingClientRect();
        const panel = this.getPanel().getBoundingClientRect();
        const panelButtons = this.getPanelButtons().getBoundingClientRect();

        let left = 0;
        const keyBoxRight = keyBox.right + window.scrollX;
        const keyBoxLeft = keyBox.left + window.scrollX;//свобдное место слева
        const bottom = panelButtons.bottom - (keyBox.bottom - keyBox.width / 2) - popupHeight / 2;

        const emptyWidthRight = panel.width - keyBoxRight; //свободное места справа

        if (emptyWidthRight >= popupWidth) {
            left = keyBoxRight * 100 / panel.width + 1;
        } else if (keyBoxLeft >= popupWidth) {
            left = (keyBoxLeft - popupWidth) * 100 / panel.width - 1;
        } else {
            left = (panel.width - popupWidth) * 100 / panel.width - 3;
        }
        return {left, bottom}
    }

    handleOpenPopup(target) {
        this.refreshPopupPosition(target.parentElement);
    }

    refreshPopupPosition(el) {
        const popupPosition = this.calcPopupPosition(el);
        this.setState({popupPosition});
    }

    handleCancelEditKey() {
        this.handleClosePopup();
        this.props.cancelKey();
    }

    handleRemoveEditKey(key) {
        this.handleClosePopup();
        this.props.removeKey({key});
    }

    handleClosePopup() {
        this.setState({popupPosition: null});
    }

    handleEditorSaveKey(form) {
        this.props.saveKey({key: form.toJS()});
        this.handleClosePopup();
    }

    handleSearchProduct(val) {
        const query = val || '';
        if (query.length == 0 || query.length >= 2) {
            this.props.searchProduct({query});
        }
    }

    handleSearchCategory(val) {
        const query = val || '';
        if (query.length == 0 || query.length >= 2) {
            this.props.searchCategory({query});
        }
    }

    handleChangeSelectedKey(form) {
        const key = form.toJS();
        const gridSize = this.state.gridSize;
        if (isValidCord(gridSize, key))
            this.props.updateSelectedKey({key});
    }

    handleCalcPosition() {
        const target = this.getPanelButtons().querySelector('.selected');
        target && this.refreshPopupPosition(target);
    }

    getPanelButtons() {
        return document.querySelector('.gk_panel_buttons');
    }

    getPanel() {
        return document.querySelector('.gk_panel');
    }

    render() {
        const {popupPosition, gridSize}=this.state || {};
        const {tabs, activeTab, keys, loading, error, selectedKey, searchProductState, searchCategoryState, loadingProducts}=this.props;

        if (!loading && tabs && activeTab) {
            return (
                <div class="gk_panel">
                    <CashBoxTabs tabs={tabs}
                                 activeTab={activeTab}
                                 onAddTab={::this.handleAddTab}
                                 onSelectTab={::this.handleSelectTab}/>

                    <CashBoxToolbar tab={activeTab}
                                    onDeleteTab={::this.handleRemoveTab}
                                    onSaveTab={::this.handleSaveToolbar}
                                    initialValues={activeTab}
                                    onChange={::this.handleSaveToolbar}/>

                    <CashBoxHotKeys gridSize={gridSize}
                                    keys={keys}
                                    loadingProducts={loadingProducts}
                                    selectedKey={selectedKey}
                                    onSelectEmptyKey={::this.handleSelectEmptyKey}
                                    onBackFromCategory={::this.handleGoBackFromCategory}
                                    onOpenCategory={::this.handleOpenCategory}
                                    onSelectProduct={::this.handleSelectProduct}/>

                    {popupPosition && <HotKeyEditor position={popupPosition}
                                                    model={selectedKey}
                                                    initialValues={selectedKey}
                                                    searchCategory={searchCategoryState}
                                                    searchProduct={searchProductState}
                                                    gridSize={gridSize}
                                                    onSearchCategory={::this.handleSearchCategory}
                                                    onSearchProducts={::this.handleSearchProduct}
                                                    onChangePosition={::this.handleCalcPosition}
                                                    onSave={::this.handleEditorSaveKey}
                                                    onCancel={::this.handleCancelEditKey}
                                                    onChange={::this.handleChangeSelectedKey}
                                                    onRemove={::this.handleRemoveEditKey}/>}

                    <div class="gk_panel_footer">
                        Выберите ячейку для добавления товара на экран кассы. <br/>Для редактирования выберите ту же
                        ячейку.
                    </div>
                </div>);
        }
        else {
            return (<LoaderBlock loading={loading}/>)
        }
    }
}


const toolBarFormName = 'cashBoxToolbarForm';

function mapStateToProps(state, ownProps) {
    const cashBoxTabs = tabSelector.getSection(state);
    return {
        tabs: tabSelector.getTabs(state),
        activeTab: tabSelector.getActiveTab(state),
        keys: tabSelector.getActiveKeys(state),
        error: cashBoxTabs.get('error'),
        loading: cashBoxTabs.get('loading'),
        loadingProducts: cashBoxTabs.get('loadingProducts'),
        selectedKey: tabSelector.getSelectedKey(state),
        isValidToolbarForm: isValid(toolBarFormName)(state),
        searchProductState: tabSelector.getProducts(state),
        searchCategoryState: tabSelector.getCategories(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            selectTab: actions.selectTab,
            removeTab: actions.removeTab.request,
            newTab: actions.newTab,
            updateTab: actions.updateTab,

            addKey: actions.addKey,
            selectKey: actions.selectKey,
            saveKey: actions.saveKey,
            cancelKey: actions.cancelKey,
            removeKey: actions.removeKey,
            updateSelectedKey: actions.updateSelectedKey,
            searchProduct: actions.searchProduct.request,
            searchCategory: actions.searchCategory.request,

            openCategory: actions.openCategory,
            backFromCategory: actions.backFromCategory

        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(retailPointHOC(toJs(CashBoxContainer)));
