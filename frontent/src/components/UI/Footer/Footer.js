import React, {Component} from 'react';
import './Footer.css'
import Container from "@material-ui/core/Container";

class Footer extends Component {
    render() {
        return (
            <div className='footerBox'>
                <Container>
                    <p className='text'>@ From WarCraft 3 and Facebook made in ZombieLand</p>
                </Container>
            </div>
        );
    }
}

export default Footer;