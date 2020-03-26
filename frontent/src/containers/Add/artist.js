import React, {Component} from 'react';
import {Badge, Form, FormGroup, Input, Label} from "reactstrap";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {createArtist} from "../../store/action/artistAction";


class Artist extends Component {
    state = {
        nameArtist: '',
        infoArtist: '',
        imageArtist: ''
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            let value = this.state[key];

            formData.append(key, value);
        });

        this.props.createArtist(formData);
    };

    render() {
        if (!this.props.user) {
            return <Redirect to='/login'/>
        } else {
            return (
                <div>
                    <h1><Badge color="secondary">Add Artist</Badge></h1>
                    <hr className="HRColor"/>
                    <Form onSubmit={this.submitFormHandler}>
                        <FormGroup>
                            <Label for="nameArtist">Name</Label>
                            <Input onChange={this.inputChangeHandler} type="text" name="nameArtist" id="nameArtist"
                                   placeholder="Name artist:"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="infoArtist">Description</Label>
                            <Input onChange={this.inputChangeHandler} type="textarea" name="infoArtist" id="infoArtist"
                                   placeholder="Description:"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="imageArtist">Photo</Label>
                            <Input onChange={this.fileChangeHandler} type="file" name="imageArtist" id="imageArtist"/>
                        </FormGroup>
                        <Button type={'submit'} variant="contained" color="primary">Create</Button>
                    </Form>
                </div>
            );
        }
    }
}
const mapStateToProps = state => {
    return {
        user: state.users.user,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createArtist: (data) => dispatch(createArtist(data)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Artist);