import React, { useEffect, useRef, useState } from "react";
import './Application.css'
import PhoneBodyFrame from '../Assets/MobileFrame.png'
import SiverLogoBottom from '../Assets/logo/Sivvar_Logo.png'
import SivvarLogo from '../Assets/logo/Sivvar_communicator.png'
import CallerIcon from '../Assets/icons/callerIcon.png'
import CallerImage from '../Assets/icons/caller-identity.png'
import AnimatedCalling from '../Assets/icons/CallingIconAnimated.gif'
import HangUp from '../Assets/icons/hangbtn.png'
import Audio from '../Assets/icons/recordaudio.png'
import Speakers from '../Assets/icons/speaker.png'
import DialPads from '../Assets/icons/DialPads.png'
import SuccessIcon from '../Assets/icons/Success.png'
import Gtbank from '../Assets/logo/gtbank.png'
import AccessBank from '../Assets/logo/access.png'
import KudaBank from '../Assets/logo/kuda.png'
import Uba from '../Assets/logo/ubaank.png'
import VideoCall from '../Assets/icons/video.png'

import { countdownTimer } from '../GlobalFunctions/Helper'; // Adjust the path to the correct location of helper.js
// import Login from "../Routes/Login/Login";

const Application = () => {
    // null every one of the input (prevent from jumping by default)
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);
    // phone time and network 
    const [time, setTime] = useState(getFormattedTime());
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(getFormattedTime());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    function getFormattedTime() {
        const currentTime = new Date();
        let hours = currentTime.getHours();
        let amOrPm = 'AM';
        if (hours > 12) {
            hours -= 12;
            amOrPm = 'PM';
        } else if (hours === 12) {
            amOrPm = 'PM';
        } else if (hours === 0) {
            hours = 12;
        }
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes} ${amOrPm}`;
    }

    const [remainingTime, setRemainingTime] = useState('5:00');
    useEffect(() => {
        // Start the countdown timer when the component mounts
        countdownTimer((formattedTime) => {
            setRemainingTime(formattedTime);
        });

        // Clean up the interval when the component unmounts
        return () => clearInterval();
    }, []);

    // PHONE DIALER SCREEN FUNCTIONS
    const [phoneNumber, setPhoneNumber] = useState('');
    const handleButtonClick = (digit) => {
        setPhoneNumber((prevNumber) => prevNumber + digit);
    };

    const handleClearButtonClick = () => {
        setPhoneNumber('');
    };

    // ALL PHONE ROUTES RE-MODIFIED
    const [login, setLogin] = useState(true) // default phone state
    const [enterNumber, setEnterNumber] = useState(false) // PHONE NUMBER REG DEFAULT SCREEN
    const [otpVerification, setOtpVerification] = useState(false) // OTP VERIFICATION DEFAULT SCREEN
    const [invalidOtp, setInvalidOtp] = useState(false) // INVALID OTP SCREEN DEFAULT STATE
    const [dialerScreen, setDialerScreen] = useState(false) // DILER SCREEN DEFAULT STATE
    const [callConnecting, setCallConnecting] = useState(false) // DILER SCREEN DEFAULT STATE
    const [callInbound, setCallInbound] = useState(false) // CALL INBOUND
    const [forgotPassword, setForgotPassword] = useState(false) // forgot password
    const [newPassword, setNewPassword] = useState(false) // set new password screen default state
    const [successResetPassword, setSuccessResetPassword] = useState(false) // successfully reset passord screen
    const [executeEffect, setExecuteEffect] = useState(false) // State to control useEffect
    const [showServices, setShowServices] = useState(false)
    const [successCreatePassword, setSuccessCreatePassword] = useState(false)
    const [resetPassword, setResetPassword] = useState(false)
    const [callHistory, setCallHistory] = useState(false)

    useEffect(() => {
        // This effect will run when the component mounts and whenever `callConnecting` changes.

        if (executeEffect) {
            // If `callConnecting` is true, set a timer to switch to `callInbound` after 5 seconds.
            const timer = setTimeout(() => {
                setCallConnecting(false);
                setCallInbound(true);
            }, 5000);

            // Cleanup the timer when the component unmounts or `callConnecting` changes to false.
            return () => clearTimeout(timer);
        } else {
            // If `callConnecting` is false, reset `callInbound` to false.
            setCallInbound(false);
        }
    }, [callConnecting, executeEffect]);

    // hangup ongoing call
    const HangUpCall = () => {
        setLogin(true)
        setDialerScreen(false)
        setOtpVerification(false)
        setCallConnecting(false)
        setInvalidOtp(false)
        setCallInbound(false)
        setEnterNumber(false)
        setNewPassword(false)
        setForgotPassword(false)
        setSuccessResetPassword(false)
        setExecuteEffect(false)
    }

    // handling call history
    const HandleGotoCallHistory = () => {
        setCallHistory(true)
        setDialerScreen(false)
        setShowServices(false)
    }

    const HandleGotoDialPad = () => {
        setSuccessResetPassword(false)
        setNewPassword(false)
        setForgotPassword(false)
        setCallInbound(false)
        setCallConnecting(false)
        setDialerScreen(true)
        setInvalidOtp(false)
        setOtpVerification(false)
        setEnterNumber(false)
        setLogin(false)
        setShowServices(false)
        setCallHistory(false)

    }

    const HandleSuccessCreatePass = () => {
        setSuccessCreatePassword(false)
        setSuccessResetPassword(false)
        setNewPassword(true)
        setForgotPassword(false)
        setCallInbound(false)
        setCallConnecting(false)
        setDialerScreen(false)
        setInvalidOtp(false)
        setOtpVerification(false)
        setEnterNumber(false)
        setLogin(false)
        setShowServices(false)
    }

    // HANDLERS TO NAVIGATE EVERY SCREEN OF PHONE
    // FOR LOGIN TO DIALER SCREEN
    const loginHandler = () => {
        setDialerScreen(true)
        setLogin(false)
        setOtpVerification(false)
        setCallConnecting(false)
        setInvalidOtp(false)
        setCallInbound(false)
        setEnterNumber(false)
        setNewPassword(false)
        setForgotPassword(false)
        setSuccessResetPassword(false)
        // setTimeout(()=>{setEnterNumber(!enterNumber)}, 1000 )
    }

    // ENTER NUMBER GET OTP
    const createAccount = () => {
        setEnterNumber(true)
        setDialerScreen(false)
        setLogin(false)
        setOtpVerification(false)
        setCallConnecting(false)
        setInvalidOtp(false)

        // setTimeout(()=>{setEnterNumber(!enterNumber)}, 1000 )
    }

    // show success screen when password has been reset or created 
    const GotoLoginSuccessHandler = () => {
        setSuccessResetPassword(true)
        setSuccessCreatePassword(false)
        setNewPassword(false)
        setForgotPassword(false)
        setCallInbound(false)
        setCallConnecting(false)
        setDialerScreen(false)
        setInvalidOtp(false)
        setOtpVerification(false)
        setEnterNumber(false)
        setLogin(false)
        setShowServices(false)
        setResetPassword(false)
    }

    const HandleShowServices = () => {
        setShowServices(true);
        setSuccessResetPassword(false)
        setNewPassword(false)
        setForgotPassword(false)
        setCallInbound(false)
        setCallConnecting(false)
        setDialerScreen(false)
        setInvalidOtp(false)
        setOtpVerification(false)
        setEnterNumber(false)
        setLogin(false)
        setCallHistory(false)
    }
    const ResetPasswordHandler = () => {
        setForgotPassword(true)
        setEnterNumber(false)
        setDialerScreen(false)
        setLogin(false)
        setOtpVerification(false)
        setCallConnecting(false)
        setInvalidOtp(false)
    }
    // INVALID OTP
    const getOtpHandler = () => {
        setOtpVerification(true)
        setEnterNumber(false)
        setDialerScreen(false)
        setLogin(false)
        setCallConnecting(false)
        setInvalidOtp(false)

        // setTimeout(()=>{setEnterNumber(!enterNumber)}, 1000 )
    }

  
    // GO BACK HOME
    const goBackHome = () => {
        setInvalidOtp(false)
        setOtpVerification(false)
        setEnterNumber(false)
        setDialerScreen(false)
        setLogin(true)
        setCallConnecting(false)
        setSuccessResetPassword(false)
        setSuccessCreatePassword(false)
        setNewPassword(false)
        setForgotPassword(false)
        setCallInbound(false)
        // setTimeout(()=>{setEnterNumber(!enterNumber)}, 1000 )
    }

    const setNewPassHandler = () => {
        setNewPassword(false)
        setResetPassword(true)
        setForgotPassword(false)
        setCallInbound(false)
        setCallConnecting(false)
        setDialerScreen(false)
        setInvalidOtp(false)
        setOtpVerification(false)
        setEnterNumber(false)
        setLogin(false)
        setSuccessResetPassword(false)
    }

    // MAKE INBOUBOUND CALL
    const makeCalls = () => {
        setCallConnecting(true)
        setInvalidOtp(false)
        setOtpVerification(false)
        setEnterNumber(false)
        setDialerScreen(false)
        setLogin(false)
        setCallInbound(false)
        setSuccessResetPassword(false)
        setNewPassword(false)
        setForgotPassword(false)

    }

    //GET FLAG IMAGE PATHE FOE THE PHPNE NUMBER
    // const [selectedCountry, setSelectedCountry] = useState(''); 
    // const handleCountryChange = (event) => {
    //     setSelectedCountry(event.target.value);
    // };
    // const getFlagImagePath = (country) => {
    //     switch (country) {
    //         case 'usa':
    //             return 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png';
    //         case 'uk':
    //             return 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1920px-Flag_of_the_United_Kingdom.svg.png';
    //         case 'nigeria':
    //             return 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_Nigeria.svg/1920px-Flag_of_Nigeria.svg.png';
    //         default:
    //             return 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_Nigeria.svg/1920px-Flag_of_Nigeria.svg.png';
    //     }

    // };


    const [changeTypeOfInput, setChangeTypeOfInput] = useState('password')
    const handleShowPassword = () => {
        setChangeTypeOfInput((prevInputType) => {
            return prevInputType === 'password' ? 'text' : 'password';
        });
    }

    const [toggleShowCountries, setToggleShowCountries] = useState(false);
    const [currentFlag, setCurrentFlag] = useState({
        name: 'Nigeria',
        code: 'NGN',
        dial_code: '+234',
        url: 'https://flagcdn.com/ng.svg',
        alt_name: "Nigeria Flag"
    });

    const Countries = [
        {
            name: 'Nigeria',
            code: 'NGN',
            dial_code: '+234',
            url: 'https://flagcdn.com/ng.svg',
            alt_name: "Nigeria Flag"
        },
        {
            name: 'United Kingdom',
            code: 'UK',
            dial_code: '+44',
            url: 'https://flagcdn.com/gb-eng.svg',
            alt_name: "United Kingdom"
        },
        {
            name: 'United State',
            code: 'USA',
            dial_code: '+1',
            url: 'https://flagcdn.com/us.svg',
            alt_name: "United Kingdom"
        },
    ]

    const handleInputChange = (event, nextInputRef) => {
        const currentInput = event.target;
        const maxLength = parseInt(currentInput.getAttribute('maxlength'), 10);
        const currentLength = currentInput.value.length;

        if (currentLength === maxLength) {
            nextInputRef.current.focus();
        }
    };

    return (
        <div>
            <div className="appBg">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4"></div>
                        {/* the phone body section*/}
                        <div className="col-md-4">
                            <div className="phonBody">
                                <img className="thePhone" src={PhoneBodyFrame} alt="illustration phone body" loading="lazy" />
                                <div className="phoneContents">
                                    {/* the phone content inner wrapper*/}
                                    <div className="phoneHeader">
                                        <div className="phoneHeaderContents">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <span className="tinyTime bold-time">{time}</span>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="phoneNetwork">
                                                            <i className="fas fa-signal bold-time"></i>
                                                            <i className="fas fa-wifi mx-2 bold-time"></i>
                                                            <i className="fas fa-battery-full bold-time" id="div1"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*Header - App logo and Network notofications*/}
                                                <div className="row mt-3">
                                                    <div className="col-md-6">
                                                        <div className="logoPlace mt-3">
                                                            <img width='100' src={SivvarLogo} alt="sivv" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="networkStatus">
                                                            <div className="statusIdentity">
                                                                <i className="fas fa-bell mt-4 float-right bellsNoti"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* ================== ALL ROUTES AVAILABLE HERE ===============*/}

                                                {login &&
                                                    // login route
                                                    <div>
                                                        {/*Header - login text on the Header*/}
                                                        <div className="row mt-5">
                                                            <div className="col-md-12">
                                                                <div className="text-center">
                                                                    <h3 className="brand">Login</h3>
                                                                    <span className="text-center tinyTxt">Please enter your phone</span> <br />
                                                                    <span className="tinyTxt n">number and password</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*Login*/}
                                                        <div className="row">
                                                            <div className="col-md-1"></div>
                                                            <div className="col-md-10">
                                                                <div className="form-group">
                                                                    <form>
                                                                        <div className="d-flex gap-1">
                                                                            <div className="countriesPlace2">
                                                                                <div className="mt-2 d-flex gap-2">
                                                                                    <img width='40px' src={currentFlag.url} alt={currentFlag.alt_name} />
                                                                                    <span onClick={() => setToggleShowCountries(!toggleShowCountries)} className="fas fa-caret-down"></span>
                                                                                </div>
                                                                                {
                                                                                    toggleShowCountries &&
                                                                                    <div id="countryDrops">
                                                                                        {
                                                                                            Countries.map(
                                                                                                (country, key) => {
                                                                                                    return <section>
                                                                                                        <div>
                                                                                                            <img width='40px' onClick={() => setCurrentFlag(country)} key={key} src={country.url} alt={currentFlag.alt_name} />
                                                                                                        </div>
                                                                                                    </section>
                                                                                                }
                                                                                            )
                                                                                        }
                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                            <input className="form-control form-number" type="number" placeholder={currentFlag.dial_code} />
                                                                        </div>
                                                                        <div className="mt-3">
                                                                            <input className="form-control form-pass" type={changeTypeOfInput} placeholder="password" />
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-md-6 d-flex gap-1">
                                                                                <input className="form-check" type="checkbox" /><small className="reduce"> remember me</small>
                                                                            </div>
                                                                            <div className="col-md-6 d-flex gap-1">
                                                                                <small onClick={ResetPasswordHandler} className="reduce bolder cursor moveFromRight">forgot password?</small>
                                                                            </div>
                                                                        </div>
                                                                        <button onClick={loginHandler} className="mt-4 loginBtn text-white btn btn-info mx-auto">Login</button>
                                                                        <div className="mt-2">
                                                                            <small id="moveToTop">don't have an account? <small onClick={createAccount} className="cursor orange">Create an Account</small></small>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-1"></div>
                                                        </div>
                                                        <div className="container">
                                                            <div className="row fixedFooter">
                                                                <div className="col-md-4"></div>
                                                                <div className="col-md-4">
                                                                    <div className="lineBottom"></div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <img id="siverLogo" width='30px' src={SiverLogoBottom} alt="the siver logoIcon" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }

                                                {enterNumber &&
                                                    // register phone number route
                                                    <div>
                                                        {/*Register new user account set phone number*/}
                                                        <div className="row mt-5">
                                                            <div className="col-md-12">
                                                                <div className="text-center">
                                                                    <h3 className="brand">Enter Your Number</h3>
                                                                    <span className="text-center tinyTxt">Choose your country and</span> <br />
                                                                    <span className="tinyTxt n">enter your mobile number</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*Reg Phone Number*/}
                                                        <div className="row mt-5">
                                                            <div className="col-md-1"></div>
                                                            <div className="col-md-10">
                                                                <div className="form-group">
                                                                    <form>
                                                                        <div className="d-flex gap-1">
                                                                            <div className="countriesPlace2">
                                                                                <div className="mt-2 d-flex gap-2">
                                                                                    <img width='40px' src={currentFlag.url} alt={currentFlag.alt_name} />
                                                                                    <span onClick={() => setToggleShowCountries(!toggleShowCountries)} className="fas fa-caret-down"></span>
                                                                                </div>
                                                                                {
                                                                                    toggleShowCountries &&
                                                                                    <div id="countryDrops">
                                                                                        {
                                                                                            Countries.map(
                                                                                                (country, key) => {
                                                                                                    return <section>
                                                                                                        <div>
                                                                                                            <img width='40px' onClick={() => setCurrentFlag(country)} key={key} src={country.url} alt={currentFlag.alt_name} />
                                                                                                        </div>
                                                                                                    </section>
                                                                                                }
                                                                                            )
                                                                                        }
                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                            <input className="form-control form-number" type="number" placeholder={currentFlag.dial_code} />
                                                                        </div>
                                                                        <button onClick={getOtpHandler} className="mt-4 loginBtn text-white btn btn-info mx-auto">Submit</button>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-1"></div>
                                                        </div>
                                                        <div className="container foot2">
                                                            <div className="row fixedFooter">
                                                                <div className="col-md-4"></div>
                                                                <div className="col-md-4">
                                                                    <div className="lineBottom"></div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <img id="siverLogo" width='30px' src={SiverLogoBottom} alt="the siver logoIcon" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                }

                                                {otpVerification &&
                                                    // otp verification route
                                                    <div>
                                                        {/*Header - login text on the Header*/}
                                                        <div className="row mt-5">
                                                            <div className="col-md-12">
                                                                <div className="text-center">
                                                                    <h3 className="brand">OTP Verification</h3>
                                                                    <span className="text-center tinyTx t red">You will receive a call from: 090857543</span> <br />
                                                                    <span className="tinyTxt ">Enter the 4 digits otp you</span><br />
                                                                    <span className="tinyTxt">received from the voice prompt</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*otb verification*/}
                                                        <div className="row mt-5">
                                                            <div className="col-md-1"></div>
                                                            <div className="col-md-10">
                                                                <div className="form-group">
                                                                    <form>
                                                                        <div className="d-flex gap-1">
                                                                            <input maxLength="1" ref={input1Ref} className="form-control form-number otp" type={changeTypeOfInput} onChange={(event) => handleInputChange(event, input2Ref)} />
                                                                            <input maxLength="1" ref={input2Ref} className="form-control form-number otp" type={changeTypeOfInput} onChange={(event) => handleInputChange(event, input3Ref)} />
                                                                            <input maxLength="1" ref={input3Ref} className="form-control form-number otp" type={changeTypeOfInput} onChange={(event) => handleInputChange(event, input4Ref)} />
                                                                            <input maxLength="1" ref={input4Ref} className="form-control form-number otp" type={changeTypeOfInput} onChange={(event) => handleInputChange(event, input1Ref)} />
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-md-2"></div>
                                                                            <div className="col-md-12 mt-3">
                                                                                <div className="d-flex gap-5 timer-andtogle">
                                                                                    <span className="red tinyTxt">OTP expires in {remainingTime}</span>
                                                                                    <i onClick={handleShowPassword} className="fas fa-eye-slash cursor"></i>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-2"></div>
                                                                        </div>
                                                                        <button onClick={HandleSuccessCreatePass} className="mt-4 loginBtn text-white btn btn-info mx-auto">Verify</button>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-1"></div>
                                                        </div>
                                                        <div className="container footOtp">
                                                            <div className="row fixedFooter">
                                                                <div className="col-md-4"></div>
                                                                <div className="col-md-4">
                                                                    <div className="lineBottom"></div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <img id="siverLogo" width='30px' src={SiverLogoBottom} alt="the siver logoIcon" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }

                                                {invalidOtp &&
                                                    // invalid OTP for verification of number (Screen)
                                                    <div>
                                                        {/*Header - login text on the Header*/}
                                                        <div className="row mt-5">
                                                            <div className="col-md-12">
                                                                <div className="text-center">
                                                                    <h3 className="red">Invalid OTP</h3>
                                                                    <span className="tinyTxt ">Sorry your OTP is invalid </span> <br /><small className="m-botom">return back to homepage</small>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*invalid OTP verification*/}
                                                        <div className="row mt-5">
                                                            <div className="col-md-1"></div>
                                                            <div className="col-md-10">
                                                                <div className="form-group">
                                                                    <form>
                                                                        <button onClick={goBackHome} className="mt-4 loginBtn text-white btn btn-info mx-auto goHome">Return to Home</button>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-1"></div>
                                                        </div>
                                                        <div className="container footOtpInvalid">
                                                            <div className="row fixedFooter">
                                                                <div className="col-md-4"></div>
                                                                <div className="col-md-4">
                                                                    <div className="lineBottom"></div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <img id="siverLogo" width='30px' src={SiverLogoBottom} alt="the siver logoIcon" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }

                                                {dialerScreen &&
                                                    // Dailer (Screen)
                                                    <div>
                                                        {/*Dialer screen*/}
                                                        <div className="row mt-2">
                                                            <div className="col-md-12">
                                                                <div className="btn-group btnGroupBtnDialer " role="group" aria-label="Basic example">
                                                                    <button onClick={HandleGotoDialPad} type="button" className="gotoDialerBack">Dial Pad</button>
                                                                    <button onClick={HandleGotoCallHistory} type="button" className="CallHistory">Call History</button>
                                                                    <button onClick={HandleShowServices} type="button" className="gotoServiceBack">Services</button>
                                                                </div>
                                                                <div className="mt-3">
                                                                    <input value={phoneNumber} className="form-control screenDialer" type="text" placeholder="Phone" readOnly />
                                                                    <i className="fas fa-eye-slash visibilities"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*DIALER PADS ======================>>>>*/}
                                                        <div className="row mt-5">
                                                            <div className="col-md-1"></div>
                                                            <div className="col-md-10">
                                                                <div className="phone-dialer">
                                                                    <div className="dialer-row d-flex gap-5">
                                                                        <button onClick={() => handleButtonClick('1')}>1</button>
                                                                        <button onClick={() => handleButtonClick('2')}>2</button>
                                                                        <button onClick={() => handleButtonClick('3')}>3</button>
                                                                    </div>
                                                                    <div className="dialer-row d-flex gap-5 mt-2">
                                                                        <button onClick={() => handleButtonClick('4')}>4</button>
                                                                        <button onClick={() => handleButtonClick('5')}>5</button>
                                                                        <button onClick={() => handleButtonClick('6')}>6</button>
                                                                    </div>
                                                                    <div className="dialer-row d-flex gap-5 mt-2">
                                                                        <button onClick={() => handleButtonClick('7')}>7</button>
                                                                        <button onClick={() => handleButtonClick('8')}>8</button>
                                                                        <button onClick={() => handleButtonClick('9')}>9</button>
                                                                    </div>
                                                                    <div className="dialer-row d-flex gap-5 mt-3">
                                                                        <button onClick={() => handleButtonClick('*')}>*</button>
                                                                        <button onClick={() => handleButtonClick('0')}>0</button>
                                                                        <button onClick={() => handleButtonClick('#')}>#</button>
                                                                    </div>
                                                                    <div className="dialer-row d-flex gap-5 mt-4">
                                                                        <div className="container">
                                                                            <div className="row">
                                                                                <div className="col-md-4"></div>
                                                                                <div className="col-md-4">
                                                                                    <img onClick={makeCalls} className="cursor" width={50} src={CallerIcon} alt="" />
                                                                                </div>
                                                                                <div className="col-md-4">
                                                                                    <span className="fas fa-delete-left deleteBtn cursor" onClick={handleClearButtonClick}></span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-1"></div>
                                                        </div>
                                                        <div className="container footDialer">
                                                            <div className="row fixedFooter">
                                                                <div className="col-md-4"></div>
                                                                <div className="col-md-4">
                                                                    <div className="lineBottom"></div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <img id="siverLogo" width='30px' src={SiverLogoBottom} alt="the siver logoIcon" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }

                                                {showServices &&
                                                    // Dailer (Screen)
                                                    <div>
                                                        <div className="btn-group btnGroupBtnDialer " role="group" aria-label="Basic example">
                                                            <button onClick={HandleGotoDialPad} type="button" className="gotoDialerBack">Dial Pad</button>
                                                            <button onClick={HandleGotoCallHistory} type="button" className="CallHistory">Call History</button>
                                                            <button onClick={HandleShowServices} type="button" className="gotoServiceBack">Services</button>
                                                        </div>
                                                        {/*DIALER PADS ======================>>>>*/}
                                                        <div className="row mt-5">
                                                            <div className="col-md-12">
                                                                <div className="d-flex gap-1">
                                                                    <div className="serviceBox1">
                                                                        <img width={50} src={AccessBank} alt="service iconics" />
                                                                        <div className='serviceFoot4'>
                                                                            <small className="white">Access Bank</small>
                                                                        </div>
                                                                    </div>
                                                                    <div className="serviceBox1">
                                                                        <img width={50} src={Uba} alt="service iconics" />
                                                                        <div className='serviceFoot3'>
                                                                            <small className="white">UBAfrica</small>
                                                                        </div>
                                                                    </div>
                                                                    <div className="serviceBox1">
                                                                        <img width={70} src={Gtbank} alt="service iconics" />
                                                                        <div className='serviceFoot2'>
                                                                            <small className="white">Gtbank</small>
                                                                        </div>
                                                                    </div>
                                                                    <div className="serviceBox1">
                                                                        <img width={50} src={KudaBank} alt="service iconics" />
                                                                        <div className='serviceFoot1'>
                                                                            <small className="white">KudaBank</small>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className="col-md-12">
                                                                <div className="d-flex gap-1">
                                                                    <div className="serviceBox1">
                                                                        <img width={50} src={AccessBank} alt="service iconics" />
                                                                        <div className='serviceFoot4'>
                                                                            <small className="white">Access Bank</small>
                                                                        </div>
                                                                    </div>
                                                                    <div className="serviceBox1">
                                                                        <img width={50} src={Uba} alt="service iconics" />
                                                                        <div className='serviceFoot3'>
                                                                            <small className="white">UBAfrica</small>
                                                                        </div>
                                                                    </div>
                                                                    <div className="serviceBox1">
                                                                        <img width={70} src={Gtbank} alt="service iconics" />
                                                                        <div className='serviceFoot2'>
                                                                            <small className="white">Gtbank</small>
                                                                        </div>
                                                                    </div>
                                                                    <div className="serviceBox1">
                                                                        <img width={50} src={KudaBank} alt="service iconics" />
                                                                        <div className='serviceFoot1'>
                                                                            <small className="white">KudaBank</small>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className="col-md-12">
                                                                <div className="d-flex gap-1">
                                                                    <div className="serviceBox1">
                                                                        <img width={50} src={AccessBank} alt="service iconics" />
                                                                        <div className='serviceFoot4'>
                                                                            <small className="white">Access Bank</small>
                                                                        </div>
                                                                    </div>
                                                                    <div className="serviceBox1">
                                                                        <img width={50} src={Uba} alt="service iconics" />
                                                                        <div className='serviceFoot3'>
                                                                            <small className="white">UBAfrica</small>
                                                                        </div>
                                                                    </div>
                                                                    <div className="serviceBox1">
                                                                        <img width={70} src={Gtbank} alt="service iconics" />
                                                                        <div className='serviceFoot2'>
                                                                            <small className="white">Gtbank</small>
                                                                        </div>
                                                                    </div>
                                                                    <div className="serviceBox1">
                                                                        <img width={50} src={KudaBank} alt="service iconics" />
                                                                        <div className='serviceFoot1'>
                                                                            <small className="white">KudaBank</small>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className="col-md-12">
                                                                <div className="d-flex gap-1">
                                                                    <div className="serviceBox1">
                                                                        <img width={50} src={AccessBank} alt="service iconics" />
                                                                        <div className='serviceFoot4'>
                                                                            <small className="white">Access Bank</small>
                                                                        </div>
                                                                    </div>
                                                                    <div className="serviceBox1">
                                                                        <img width={50} src={Uba} alt="service iconics" />
                                                                        <div className='serviceFoot3'>
                                                                            <small className="white">UBAfrica</small>
                                                                        </div>
                                                                    </div>
                                                                    <div className="serviceBox1">
                                                                        <img width={70} src={Gtbank} alt="service iconics" />
                                                                        <div className='serviceFoot2'>
                                                                            <small className="white">Gtbank</small>
                                                                        </div>
                                                                    </div>
                                                                    <div className="serviceBox1">
                                                                        <img width={50} src={KudaBank} alt="service iconics" />
                                                                        <div className='serviceFoot1'>
                                                                            <small className="white">KudaBank</small>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className="col-md-12">
                                                                <div className="d-flex gap-1">
                                                                    <div className="serviceBox1">
                                                                        <img width={50} src={AccessBank} alt="service iconics" />
                                                                        <div className='serviceFoot4'>
                                                                            <small className="white">Access Bank</small>
                                                                        </div>
                                                                    </div>
                                                                    <div className="serviceBox1">
                                                                        <img width={50} src={Uba} alt="service iconics" />
                                                                        <div className='serviceFoot3'>
                                                                            <small className="white">UBAfrica</small>
                                                                        </div>
                                                                    </div>
                                                                    <div className="serviceBox1">
                                                                        <img width={70} src={Gtbank} alt="service iconics" />
                                                                        <div className='serviceFoot2'>
                                                                            <small className="white">Gtbank</small>
                                                                        </div>
                                                                    </div>
                                                                    <div className="serviceBox1">
                                                                        <img width={50} src={KudaBank} alt="service iconics" />
                                                                        <div className='serviceFoot1'>
                                                                            <small className="white">KudaBank</small>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="container footServices">
                                                            <div className="row fixedFooterService">
                                                                <div className="col-md-4"></div>
                                                                <div className="col-md-4">
                                                                    <div className="lineBottom"></div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <img id="siverLogo" width='30px' src={SiverLogoBottom} alt="the siver logoIcon" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }

                                                {callHistory &&
                                                    // Dailer (Screen)
                                                    <div>
                                                        <div className="btn-group btnGroupBtnDialer " role="group" aria-label="Basic example">
                                                            <button onClick={HandleGotoDialPad} type="button" className="gotoDialerBack">Dial Pad</button>
                                                            <button onClick={HandleGotoCallHistory} type="button" className="CallHistory">Call History</button>
                                                            <button onClick={HandleShowServices} type="button" className="gotoServiceBack">Services</button>
                                                        </div>
                                                        {/*DIALER PADS ======================>>>>*/}
                                                        <div className="container">
                                                            <div className="row mt-3">
                                                                <small>Today</small>
                                                                <div className="col-md-8">
                                                                    <div className="d-flex gap-1">
                                                                        <img src={AccessBank} alt="access nak logo call history" />
                                                                        <small><i className="fas fa-phone"></i> Answered</small>
                                                                        <small></small>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <small>12:00 PM</small>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container footServices">
                                                            <div className="row fixedFooterService">
                                                                <div className="col-md-4"></div>
                                                                <div className="col-md-4">
                                                                    <div className="lineBottom"></div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <img id="siverLogo" width='30px' src={SiverLogoBottom} alt="the siver logoIcon" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }

                                                {callConnecting &&
                                                    // register phone number route
                                                    <div>

                                                        {/* CALL CONNECTING  */}
                                                        <div className="row mt-5">
                                                            <div className="col-md-1"></div>
                                                            <div className="col-md-10">
                                                                <div className="container">
                                                                    <div className="row">
                                                                        <div className="col-md-1"></div>
                                                                        <div className="col-md-10 text-center">
                                                                            <img width={100} src={CallerImage} alt="caller identity" />
                                                                        </div>
                                                                        <div className="col-md-1"></div>
                                                                    </div>
                                                                    <div className="row mt-4">
                                                                        <div className="col-md-1"></div>
                                                                        <div className="col-md-10 text-center">
                                                                            <span className="dialedLine">+ 234 9098 7457 588</span> <br />
                                                                            <small>connecting</small> <br />
                                                                            <img width={20} src={AnimatedCalling} alt='animated calling iconics' />
                                                                        </div>
                                                                        <div className="col-md-1"></div>
                                                                    </div>
                                                                    <div className="row mt-5">
                                                                        <div className="col-md-12 text-center">
                                                                            <div className="d-flex gap-2 moveCalingBTns">
                                                                                <img className="cursor" width={40} src={Audio} alt='animated calling iconics' />
                                                                                <img className="cursor" width={40} src={DialPads} alt='animated calling iconics' />
                                                                                <img onClick={HangUpCall} className="cursor" width='40' src={HangUp} alt='animated calling iconics' />
                                                                                <img className="cursor" width={40} src={VideoCall} alt='animated calling iconics' />
                                                                                <img className="cursor" width={40} src={Speakers} alt='animated calling iconics' />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-1"></div>
                                                        </div>
                                                        <div className="container footCalling">
                                                            <div className="row fixedFooter">
                                                                <div className="col-md-4"></div>
                                                                <div className="col-md-4">
                                                                    <div className="lineBottom"></div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <img id="siverLogo" width='30px' src={SiverLogoBottom} alt="the siver logoIcon" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                }

                                                {callInbound &&
                                                    // register phone number route
                                                    <div>

                                                        {/* CALL CONNECTING  */}
                                                        <div className="row mt-5">
                                                            <div className="col-md-1"></div>
                                                            <div className="col-md-10">
                                                                <div className="container">
                                                                    <div className="row">
                                                                        <div className="col-md-1"></div>
                                                                        <div className="col-md-10 text-center">
                                                                            <img width={100} src={CallerImage} alt="caller identity" />
                                                                        </div>
                                                                        <div className="col-md-1"></div>
                                                                    </div>
                                                                    <div className="row mt-4">
                                                                        <div className="col-md-1"></div>
                                                                        <div className="col-md-10 text-center">
                                                                            <span className="dialedLine">+ 234 9098 7457 588</span> <br />
                                                                            <small>00:05:22</small> <br />

                                                                        </div>
                                                                        <div className="col-md-1"></div>
                                                                    </div>
                                                                    <div className="row mt-5">
                                                                        <div className="col-md-12 text-center">
                                                                            <div className="d-flex gap-2 moveCalingBTns">
                                                                                <img className="cursor" width={50} src={Audio} alt='animated calling iconics' />
                                                                                <img className="cursor" width={50} src={DialPads} alt='animated calling iconics' />
                                                                                <img className="cursor" width={50} src={HangUp} alt='animated calling iconics' />
                                                                                <img className="cursor" width={50} src={Speakers} alt='animated calling iconics' />
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-1"></div>
                                                        </div>
                                                        <div className="container footCalling">
                                                            <div className="row fixedFooter">
                                                                <div className="col-md-4"></div>
                                                                <div className="col-md-4">
                                                                    <div className="lineBottom"></div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <img id="siverLogo" width='30px' src={SiverLogoBottom} alt="the siver logoIcon" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }

                                                {forgotPassword &&
                                                    // reset password
                                                    <div>
                                                        {/*user reset pasword screen*/}
                                                        <div className="row mt-5">
                                                            <div className="col-md-12">
                                                                <div className="text-center">
                                                                    <h3 className="brand">Reset Password</h3>
                                                                    <span className="text-center tinyTxt">Choose your country and</span> <br />
                                                                    <span className="tinyTxt n">enter your mobile number</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*Reg Phone Number*/}
                                                        <div className="row mt-5">
                                                            <div className="col-md-1"></div>
                                                            <div className="col-md-10">
                                                                <div className="form-group">
                                                                    <form>
                                                                        <div className="d-flex gap-1">
                                                                            <div className="countriesPlace2">
                                                                                <div className="mt-2 d-flex gap-2">
                                                                                    <img width='40px' src={currentFlag.url} alt={currentFlag.alt_name} />
                                                                                    <span onClick={() => setToggleShowCountries(!toggleShowCountries)} className="fas fa-caret-down"></span>
                                                                                </div>
                                                                                {
                                                                                    toggleShowCountries &&
                                                                                    <div id="countryDrops">
                                                                                        {
                                                                                            Countries.map(
                                                                                                (country, key) => {
                                                                                                    return <section>
                                                                                                        <div>
                                                                                                            <img width='40px' onClick={() => setCurrentFlag(country)} key={key} src={country.url} alt={currentFlag.alt_name} />
                                                                                                        </div>
                                                                                                    </section>
                                                                                                }
                                                                                            )
                                                                                        }
                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                            <input className="form-control form-number" type="number" placeholder={currentFlag.dial_code} />
                                                                        </div>
                                                                        <button onClick={setNewPassHandler} className="mt-4 loginBtn text-white btn btn-info mx-auto">Submit</button>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-1"></div>
                                                        </div>
                                                        <div className="container foot2">
                                                            <div className="row fixedFooter">
                                                                <div className="col-md-4"></div>
                                                                <div className="col-md-4">
                                                                    <div className="lineBottom"></div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <img id="siverLogo" width='30px' src={SiverLogoBottom} alt="the siver logoIcon" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                }

                                                {newPassword &&
                                                    // set new password screen
                                                    <div>
                                                        {/*Header - login text on the Header*/}
                                                        <div className="row mt-5">
                                                            <div className="col-md-12">
                                                                <div className="text-center">
                                                                    <h3 className="brand">Create Your Password</h3>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*set new password*/}
                                                        <div className="row">
                                                            <div className="col-md-1"></div>
                                                            <div className="col-md-10">
                                                                <div className="form-group">
                                                                    <form>
                                                                        <div className="mt-3">
                                                                            <input className="form-control form-pass" type={changeTypeOfInput} placeholder="New Password" />
                                                                            <i onClick={handleShowPassword} className="fas fa-eye-slash visiA"></i>
                                                                        </div>

                                                                        <div className="passCheckers">
                                                                            <small className="red aa"><i className="fas fa-check"></i>password must containe 8 characters</small> <br />
                                                                            <small className="red bb"><i className="fas fa-check"></i>Atleast 1 uppercase</small><br />
                                                                            <small className="red cc"><i className="fas fa-check"></i>Atleast 1 lowercase</small><br />
                                                                            <small className="red dd"><i className="fas fa-check"></i>Atleast 1 number</small><br />
                                                                            <small className="red ee"><i className="fas fa-check"></i>Atleast 1 special character</small>
                                                                        </div>

                                                                        <div className="confirmNewPass">
                                                                            <input className="form-control form-pass" type={changeTypeOfInput} placeholder="Confirm Password" />
                                                                            <i onClick={handleShowPassword} className="fas fa-eye-slash visiB"></i>
                                                                        </div>
                                                                        <button onClick={GotoLoginSuccessHandler} className="loginBtn text-white btn btn-info mx-auto buttonMover">Done</button>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-1"></div>
                                                        </div>
                                                        <div className="container">
                                                            <div className="row footerSetNewPass">
                                                                <div className="col-md-4"></div>
                                                                <div className="col-md-4">
                                                                    <div className="lineBottom"></div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <img id="siverLogo" width='30px' src={SiverLogoBottom} alt="the siver logoIcon" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }

                                                {resetPassword &&
                                                    // set new password screen
                                                    <div>
                                                        {/*Header - login text on the Header*/}
                                                        <div className="row mt-5">
                                                            <div className="col-md-12">
                                                                <div className="text-center">
                                                                    <h3 className="brand">Reset Your Password</h3>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*set new password*/}
                                                        <div className="row">
                                                            <div className="col-md-1"></div>
                                                            <div className="col-md-10">
                                                                <div className="form-group">
                                                                    <form>
                                                                        <div className="mt-3">
                                                                            <input className="form-control form-pass" type={changeTypeOfInput} placeholder="New Password" />
                                                                            <i onClick={handleShowPassword} className="fas fa-eye-slash visiA"></i>
                                                                        </div>
                                                                        <div className="passCheckers">
                                                                            <small className="red aa"><i className="fas fa-check"></i>password must containe 8 characters</small> <br />
                                                                            <small className="red bb"><i className="fas fa-check"></i>Atleast 1 uppercase</small><br />
                                                                            <small className="red cc"><i className="fas fa-check"></i>Atleast 1 lowercase</small><br />
                                                                            <small className="red dd"><i className="fas fa-check"></i>Atleast 1 number</small><br />
                                                                            <small className="red ee"><i className="fas fa-check"></i>Atleast 1 special character</small>
                                                                        </div>
                                                                        <div className="confirmNewPass">
                                                                            <input className="form-control form-pass" type={changeTypeOfInput} placeholder="Confirm Password" />
                                                                            <i onClick={handleShowPassword} className="fas fa-eye-slash visiB"></i>
                                                                        </div>
                                                                        <button onClick={GotoLoginSuccessHandler} className="loginBtn text-white btn btn-info mx-auto buttonMover">Done</button>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-1"></div>
                                                        </div>
                                                        <div className="container">
                                                            <div className="row footerSetNewPass">
                                                                <div className="col-md-4"></div>
                                                                <div className="col-md-4">
                                                                    <div className="lineBottom"></div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <img id="siverLogo" width='30px' src={SiverLogoBottom} alt="the siver logoIcon" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }

                                                {successResetPassword &&
                                                    // set new password screen
                                                    <div>
                                                        {/*Header - login text on the Header*/}
                                                        <div className="row mt-5">
                                                            <div className="col-md-12">
                                                                <div className="text-center">
                                                                    <h3 className="brand">New Password Set</h3>
                                                                    <small>proceed to Login</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*set new password*/}
                                                        <div className="row">
                                                            <div className="col-md-1"></div>
                                                            <div className="col-md-10">
                                                                <div className="successIconic text-center mt-5">
                                                                    <img width={50} src={SuccessIcon} alt="success ilustration" />
                                                                </div>
                                                                <div className="form-group moveFormGroup">
                                                                    <form>
                                                                        <button onClick={goBackHome} className="loginBtn text-white btn btn-info mx-auto">Login</button>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-1"></div>
                                                        </div>
                                                        <div className="container moveSuccessFuter">
                                                            <div className="row footerSetNewPass">
                                                                <div className="col-md-4"></div>
                                                                <div className="col-md-4">
                                                                    <div className="lineBottom"></div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <img id="siverLogo" width='30px' src={SiverLogoBottom} alt="the siver logoIcon" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }

                                                {successCreatePassword &&
                                                    // set new password screen
                                                    <div>
                                                        {/*Header - login text on the Header*/}
                                                        <div className="row mt-5">
                                                            <div className="col-md-12">
                                                                <div className="text-center">
                                                                    <h3 className="brand">New Password Created</h3>
                                                                    <small>proceed to Login</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*set new password*/}
                                                        <div className="row">
                                                            <div className="col-md-1"></div>
                                                            <div className="col-md-10">
                                                                <div className="successIconic text-center mt-5">
                                                                    <img width={50} src={SuccessIcon} alt="success ilustration" />
                                                                </div>
                                                                <div className="form-group moveFormGroup">
                                                                    <form>
                                                                        <button onClick={goBackHome} className="loginBtn text-white btn btn-info mx-auto">Login</button>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-1"></div>
                                                        </div>
                                                        <div className="container moveSuccessFuter">
                                                            <div className="row footerSetNewPass">
                                                                <div className="col-md-4"></div>
                                                                <div className="col-md-4">
                                                                    <div className="lineBottom"></div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <img id="siverLogo" width='30px' src={SiverLogoBottom} alt="the siver logoIcon" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Application;
