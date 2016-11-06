import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import { AddAccountForm } from '../../components';
import { TransactionsTable } from '../../components';
import { AccountSelector } from '../../components';
import { uploadTrxFile, getTransactions } from '../../actions/transactions.actions';
import {
    showAddForm,
    hideAddForm,
    showImportForm,
    hideImportForm,
    submitAccount,
    selectAccount,
    loadAccountsIfNeeded
} from '../../actions/accounts.actions';

class Accounts extends Component {
    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
    }

    componentWillMount() {
        this.props.loadAccountsIfNeeded();
        this.props.loadTransactions();
        this.props.selectAccount('all');
    }

    onDrop(files, e) {
        const { sendCsvFile, selectedAccount } = this.props;
        e.stopPropagation();
        e.preventDefault();
        sendCsvFile(files, selectedAccount);
    }

    render() {
        const {
            showAdd,
            hideAdd,
            showAddForm,
            showImport,
            hideImport,
            showImportForm,
            selectedAccount,
            selectAccount,
            isFetching,
            onAccountSubmit,
            accounts,
            transactions
        } = this.props;

        let disableImport = selectedAccount === 'all';

        return (
            <div className="accounts">

                <div className="accounts__controls">
                    <div className="select">
                        <AccountSelector options={accounts} onSelect={selectAccount} selected={selectedAccount} />
                    </div>
                    <div className="import-button">
                        {!showImportForm && <Button onClick={showImport} disabled={disableImport}>Import</Button>}
                        {showImportForm && <Button onClick={hideImport}>Hide</Button>}
                    </div>
                    {false &&
                        <div className="add-button">
                            <Button onClick={showAdd}><i className="glyphicon glyphicon-plus"></i></Button>
                            <AddAccountForm showModal={showAddForm} onSubmit={onAccountSubmit} onCancel={hideAdd} />
                        </div>
                    }
                </div>

                {showImportForm &&
                    <div className="accounts__import">
                        <Dropzone onDrop={this.onDrop} className="dropezone">
                            <div>Drag and drop a file or click to choose one.</div>
                        </Dropzone>
                    </div>
                }

                {!isFetching &&
                    <div className="accounts__table">
                        <TransactionsTable transactions={transactions} />
                    </div>
                }

            </div>
        );
    }
}

Accounts.propTypes = {
    loadAccountsIfNeeded: PropTypes.func.isRequired,
    loadTransactions: PropTypes.func.isRequired,

    showAdd: PropTypes.func.isRequired,
    hideAdd: PropTypes.func.isRequired,
    showAddForm: PropTypes.bool.isRequired,

    showImport: PropTypes.func.isRequired,
    hideImport: PropTypes.func.isRequired,
    showImportForm: PropTypes.bool.isRequired,

    selectedAccount: PropTypes.string.isRequired,
    selectAccount: PropTypes.func.isRequired,

    isFetching: PropTypes.bool.isRequired,
    onAccountSubmit: PropTypes.func.isRequired,

    accounts: PropTypes.array,
    transactions: PropTypes.array
};

function mapStateToProps(state) {
    return {
        isFetching: state.accounts.isFetching,
        isPosting: state.accounts.isPosting,
        accounts: state.accounts.accounts,
        transactions: state.transactions.transactions,
        selectedAccount: state.accounts.selectedAccount,
        showAddForm: state.accounts.showAddForm,
        showImportForm: state.accounts.showImportForm
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadAccountsIfNeeded: () => {
            dispatch(loadAccountsIfNeeded());
        },
        loadTransactions: (accountId) => {
            dispatch(getTransactions(accountId));
        },

        showAdd: () => {
            dispatch(showAddForm());
        },
        hideAdd: () => {
            dispatch(hideAddForm());
        },
        showImport: () => {
            dispatch(showImportForm());
        },
        hideImport: () => {
            dispatch(hideImportForm());
        },

        selectAccount: (accountId) => {
            dispatch(selectAccount(accountId));
        },

        onAccountSubmit: (newAccount) => {
            dispatch(submitAccount(newAccount))
        },

        sendCsvFile: (file, accountId) => {
            dispatch(uploadTrxFile(file, accountId))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
