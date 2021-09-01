import React from 'react';
import Logo from '../img/Logo.png'
import step1 from '../img/Wizard-Step1.png';
import step2 from '../img/Wizard-Step2.png';
import step3 from '../img/Wizard-Step3.png';
import step4 from '../img/Wizard-Step4.png';
import step5 from '../img/Wizard-Step5.png';
import arrow from '../img/arrow-right.png';
import Avatar from '../img/Avatar.png';

import { connect } from 'react-redux'
import {saveUser} from '../actions/index';

class Register extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            name : "",
            email : "",
            password : "",
            confirmPassword :"",
            file : null,
        };

        
    }

    onChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;             
        this.setState({[name]: value});
    }
    
    fileHandler = (event) => {
        this.setState({file:event.target.files[0]})
    }

    onSubmit = (event) => {
        event.preventDefault();

        if(this.state.confirmPassword !== this.state.password) {
            alert("Confirm password did not change");
            return ;
        }

        if ( this.state.file == null) {
            alert("please choose a avatar to upload");
            return;
        }

        var data = new FormData() 
        data.append('file', this.state.file, this.state.file.name);
        data.append('name', this.state.name);
        data.append('email', this.state.email);
        data.append('password', this.state.password);                
        this.props.saveUser(data)
        alert('User registered successfuly');
    }

    render(){
        return (
            <div>
                <header className="d-flex justify-content-center mt-4">
                    <img src={Logo} alt="logo"/>
                </header>
                <section id="main">
                    <div className="row mt-4 mb-5">
                        <div className="col-12 col-lg-2"></div>
                        <div className="col-12 col-lg-8">
                            <div className="step-line">
                                <div className="step">
                                    <img src={step1} alt="1"/>
                                <h5 className="step-active" > <span  className="step-active" >STEP 1</span> : <br/> create <br/> your <br/> account <br/> password</h5>
                                </div>
                                <div className="step">
                                    <img src={step2} alt="1"/>
                                    <h5> <span>STEP 2</span> : <br/> personal <br/> information</h5>
                                </div>
                                <div className="step">
                                    <img src={step3} alt="1"/>
                                    <h5> <span>STEP 3</span> : <br/> Employment <br/> details</h5>
                                </div>
                                <div className="step" >
                                    <img  src={step4} alt="" />
                                    <h5> <span>STEP 4</span> : <br/> upload <br/> document</h5>
                                </div>
                                <div className="step">
                                    <img src={step5} alt="1"/>
                                    <h5> <span>STEP 5</span> : <br/> complete</h5>
                                </div>
                            </div>

                            <div className="m-5" >
                                <form onSubmit={this.onSubmit} >
                                    <h4 className="headline" >create your account</h4>
                                    <p className="p-3 center">Because there will be documents that you need to prepare to apply for loan, let's start off by creating a password so that you can login to your account once you have these document ready.</p>
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <img src={Avatar} alt=""/>
                                            <input type="file" name="file" onChange={this.fileHandler} id="file" style={{opacity: "0"}} required />
                                            <label htmlFor="file" className="upload-btn" >Upload</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label htmlFor="">NAME</label>
                                                        <input type="text" name="name" onChange={this.onChange} className="form-control" required />
                                                    </div>  
                                                    <div className="form-group  mt-4">
                                                        <label htmlFor="">PASSWORD</label>
                                                        <input type="password" name="password" onChange={this.onChange} className="form-control" required />
                                                    </div>                                                 
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label htmlFor="">EMAIL</label>
                                                        <input type="email" name="email" onChange={this.onChange} className="form-control" required />
                                                    </div>
                                                    
                                                    <div className="form-group mt-4">
                                                        <label htmlFor="">CONFIRM PASSWORD</label>
                                                        <input type="password" name="confirmPassword" onChange={this.onChange} className="form-control" required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                       
                                    </div>

                                    <button className="btn-save mt-4" > save & next <img src={arrow} alt="save"/> </button>
                                </form>
                            </div>

                        </div>
                        <div className="col-12 col-lg-2" ></div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveUser: user => dispatch(saveUser(user))
    }
}

export default connect(null, mapDispatchToProps)(Register)