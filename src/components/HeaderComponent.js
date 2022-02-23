import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Jumbotron,
  NavbarToggler,
  NavItem,
  Collapse,
  Nav,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super();
    this.state = { openNav: false, openLoginModal: false };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  toggleNav() {
    this.setState({ openNav: !this.state.openNav });
  }

  toggleLoginModal() {
    this.setState({ openLoginModal: !this.state.openLoginModal });
  }

  handleLogin(event){
    this.setState({ openLoginModal: false });
    //directly using form the DOM
    alert("Username: " + this.username.value + " Password: " + this.password.value
            + " Remember: " + this.rememberMe.checked);
        event.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/">
              <img
                src="assets/images/logo.png"
                alt="Ristorante Con Fusion"
                height="30"
                width="41"
              />
            </NavbarBrand>
            <Collapse isOpen={this.state.openNav} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg"></span> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/aboutus">
                    <span className="fa fa-info fa-lg"></span> About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/menu">
                    <span className="fa fa-list fa-lg"></span> Menu
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contactus">
                    <span className="fa fa-address-card fa-lg"></span> Contact
                    Us
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Button outline onClick={this.toggleLoginModal}>
                    <span className="fa fa-sign-in fa-lg"></span> Login
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Ristorante Con Fusion</h1>
                <p>
                  We take inspiration from the World's best cuisines, and create
                  a unique fusion experience. Our lipsmacking creations will
                  tickle your culinary senses!
                </p>
              </div>
            </div>
          </div>
        </Jumbotron>
        <Modal
          isOpen={this.state.openLoginModal}
          toggle={this.toggleLoginModal}
        >
          <ModalHeader toggle={this.toggleLoginModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" name="username" innerRef={(input)=>this.username=input}/>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" innerRef={(input)=>this.password=input} />
              </FormGroup>
              <FormGroup check>
                <Label check htmlFor="rememberMe">
                  <Input type="checkbox" name="rememberMe"  innerRef={(input)=>this.rememberMe=input} />
                  Remember me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" className="bg-primary">Login</Button>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Header;
