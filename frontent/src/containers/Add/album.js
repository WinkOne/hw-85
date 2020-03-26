import React, {Component} from 'react';
import {Badge, Col, Container, Form, FormGroup, Input, Label} from "reactstrap";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {getArtist} from "../../store/action/action";
import {createAlbum} from "../../store/action/albumAction";

class Album extends Component {
    state = {
        titleAlbum: '',
        executor: '',
        yearOfIssueAlbum: '',
        imageCover: '',
        description: ''
    };

    componentDidMount(): void {
        this.props.getArtist()
    }

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

        this.props.createAlbum(formData);
    };


    render() {
        if (!this.props.user) {
            return <Redirect to='/login'/>
        } else {
            return (
                <Container>
                        <h1><Badge color="secondary">Create new album</Badge></h1>
                    <hr className="HRColor"/>
                    <Form onSubmit={this.submitFormHandler}>
                        <FormGroup>
                            <Label for="titleAlbum">Name</Label>
                            <Input onChange={this.inputChangeHandler} type="text" name="titleAlbum" id="titleAlbum"
                                   placeholder="Title album:"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="yearOfIssueAlbum">Name</Label>
                            <Input onChange={this.inputChangeHandler} type="text" name="yearOfIssueAlbum"
                                   id="yearOfIssueAlbum"
                                   placeholder="Year album:"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input onChange={this.inputChangeHandler} type="textarea" name="description"
                                   id="description"
                                   placeholder="Description:"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="category">Artist</Label>
                            <Col>
                                <Input
                                    type="select"
                                    name="executor" id="executor"
                                    value={this.state.executor}
                                    onChange={this.inputChangeHandler}
                                >
                                    <option value="">Please select a Artist...</option>
                                    {this.props.categoryArtist.map(artist => (
                                        <option key={artist._id} value={artist._id}>{artist.nameArtist}</option>
                                    ))}
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Label for="imageCover">Photo</Label>
                            <Input onChange={this.fileChangeHandler} type="file" name="imageCover" id="imageCover"/>
                        </FormGroup>
                        <Button type={'submit'} variant="contained" color="primary">Create</Button>
                    </Form>
                </Container>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user,
        categoryArtist: state.reducer.artist
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getArtist: () => dispatch(getArtist()),
        createAlbum: (data) => dispatch(createAlbum(data)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Album);