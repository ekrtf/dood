import React, { Component, PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class TransactionsTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="transactions-table">
                <BootstrapTable data={this.props.transactions}
                                striped={true}
                                search={true}
                                exportCSV={true}
                                csvFileName={'comptes.csv'}
                >
                    <TableHeaderColumn isKey={true} dataField="transactionId" hidden={true} searchable={false}>ID</TableHeaderColumn>
                    <TableHeaderColumn width="50px" dataField="date" dataSort={true}>Date</TableHeaderColumn>
                    <TableHeaderColumn width="80px" dataField="type" dataSort={true}>Type</TableHeaderColumn>
                    <TableHeaderColumn width="200px" dataField="vendor" dataSort={true}>Vendor</TableHeaderColumn>
                    <TableHeaderColumn width="50px" dataField="ammount" dataSort={true}>Ammount</TableHeaderColumn>
                    <TableHeaderColumn width="50px" dataField="currency" dataSort={true}>Currency</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }

}

TransactionsTable.propTypes = {
    transactions: PropTypes.array.isRequired
};

export default TransactionsTable;
