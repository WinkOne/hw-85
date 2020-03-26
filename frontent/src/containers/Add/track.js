import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {Badge, Col, Container, Form, FormGroup, Input, Label} from "reactstrap";
import Button from "@material-ui/core/Button";
import {getAlbum} from "../../store/action/action";
import {connect} from "react-redux";
import {createTrack} from "../../store/action/trackAction";

class Track extends Component {
    state = {
        titleTrack: '',
        album: '',
        duration: ''
    };

    componentDidMount(): void {
        this.props.getAlbum()
    }

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    submitFormHandler = event => {
        event.preventDefault();

        this.props.createTrack(this.state);
    };


    render() {
        if (!this.props.user) {
            return <Redirect to='/login'/>
        } else {
            return (
                <Container>
                    <h1><Badge color="secondary">Create new track</Badge></h1>
                    <hr className="HRColor"/>
                    <Form onSubmit={this.submitFormHandler}>
                        <FormGroup>
                            <Label for="titleTrack">Title</Label>
                            <Input onChange={this.inputChangeHandler} type="text" name="titleTrack" id="titleTrack"
                                   placeholder="Title track:"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="duration">Duration</Label>
                            <Input onChange={this.inputChangeHandler} type="text" name="duration"
                                   id="duration"
                                   placeholder="Duration:"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="category">Album</Label>
                            <Col>
                                <Input
                                    type="select"
                                    name="album" id="album"
                                    value={this.state.album}
                                    onChange={this.inputChangeHandler}
                                >
                                    <option value="">Please select a Track...</option>
                                    {this.props.categoryAlbum && this.props.categoryAlbum.map(album => (
                                        <option key={album._id} value={album._id}>{album.titleAlbum}</option>
                                    ))}
                                </Input>
                            </Col>
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
        categoryAlbum: state.reducer.album
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getAlbum: () => dispatch(getAlbum()),
        createTrack: (data) => dispatch(createTrack(data)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Track);