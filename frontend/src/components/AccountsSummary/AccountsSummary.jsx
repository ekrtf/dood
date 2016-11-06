import React, { Component, PropTypes } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class AccountsSummary extends Component {
    constructor(props) {
        super(props);
        this._renderRow = this._renderRow.bind(this);
    }

    render() {
        return (
            <div className="accounts-summary">
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Account</TableHeaderColumn>
                            <TableHeaderColumn>Balance</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.props.accounts.map(this._renderRow)}
                    </TableBody>
                </Table>
            </div>
        );
    }

    _renderRow(item, index) {
        return (
            <TableRow key={index}>
                <TableRowColumn>{item.name}</TableRowColumn>
                <TableRowColumn>{item.balance}</TableRowColumn>
            </TableRow>
        );
    }
}

AccountsSummary.propTypes = {
    accounts: PropTypes.array.isRequired,
    currency: PropTypes.string.isRequired
};

export default AccountsSummary;
