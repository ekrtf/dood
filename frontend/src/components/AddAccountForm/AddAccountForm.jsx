import React, { Component, PropTypes } from 'react';
import { Button, FormControl, FormGroup, Modal, Radio } from 'react-bootstrap';

let name, currency;

class AddAccountForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const { onSubmit } = this.props;
        if (name !== '' && currency) {
            onSubmit({ name, currency });
            name = null;
            currency = null;
        }
    }

    nameChange(e) {
        name = e.target.value;
    }

    currencyChange(e) {
        currency = e.target.value;
    }

    render() {
        const {
            showModal,
            onSubmit,
            onCancel
        } = this.props;

        return (
            <Modal show={showModal} onHide={onCancel} container={this} aria-labelledby="contained-modal-title">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Add New Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="addaf">
                        <FormControl type="text" placeholder="Account name" value={name} onChange={this.nameChange}/>
                        <FormGroup className="currency" value={currency} onChange={this.currencyChange}>
                            <Radio inline value="gbp">£</Radio>
                            <Radio inline value="eur">€</Radio>
                            <Radio inline value="usd">$</Radio>
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onCancel}>Close</Button>
                    <Button onClick={this.handleSubmit} className="submit-btn">Submit</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

AddAccountForm.propTypes = {
    showModal: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func.isRequired
};

export default AddAccountForm;
