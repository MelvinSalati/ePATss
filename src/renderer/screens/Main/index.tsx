import React, { useState, useEffect } from "react";
import { FlexboxGrid, Button, Input, InputGroup } from "rsuite";
import "@fontsource/roboto"; // Defaults to weight 400
import "@fontsource/roboto/100.css"; // Specify weight
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/400-italic.css"; // Specify weight and style
import "rsuite/dist/rsuite.min.css";
import PeoplesIcon from "@rsuite/icons/Peoples";
import EyeCloseIcon from "@rsuite/icons/EyeClose";
import "../../../assets/epats.css";
import bg from "./bg.png";
import Http from "../../../Http/Http.js";
import routes from "../../../routes/URLs.js";
import isValidate from "Functions/loginValidations";
import { useAsyncValue, useNavigate } from "react-router-dom";
import saveAuthenticationData   from '../../../Functions/saveAuthenticationData';

export function MainScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [process, setProcess] = useState(false);

  const emailHandler = (text) => {
    setUser(text);
  };

  const passwordHandler = (text) => {
    setPassword(text);
  };

  const handleAuthentication = async () => {
    //validate
    const isFormValidated = isValidate(user, password);
    if (isFormValidated) {
      setProcess(true);
      await Http.post(routes.auth.login, {
        email: user,
        password: password,
      })
        .then((response) => {
          const data     = response.data;
          saveAuthenticationData(data.authorisation.token,data.authorisation.expires_at, data.user.id)
          navigate("/HomeScreen");
        })
        .catch(
          console.log((error) => {
            console.log(error);
          }),
        );
    }
    setProcess(false);
  };
  return (
    <div
      style={{
        fontFamily: "roboto",
        background: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={12}>
          <div className="login-page-left">
            <center>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/28/Coat_of_arms_of_Zambia.svg"
                width={80}
                height={80}
              />
              <h4
                style={{
                  width: 370,
                  textAlign: "center",
                  fontFamily: "roboto",
                  color: "#007bFF",
                  fontSize: 24,
                }}
              >
                Electronic Patient Appointment And Tracking System.
              </h4>
            </center>
          </div>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={12}>
          <div className="login-page-right" style={{ marginTop: 200 }}>
            <div className="loginInputs">
              <h2
                style={{
                  fontFamily: "roboto",
                  fontWeight: 800,
                  fontSize: 44,
                  color: "#033",
                }}
              >
                <span
                  style={{ fontWeight: "bold", fontSize: 44, color: "#007bFF" }}
                >
                  e
                </span>
                PATs
              </h2>
              <h6
                style={{
                  fontFamily: "roboto",
                  fontWeight: 100,
                  color: "#AAA",
                  fontSize: 24,
                  padding: 30,
                }}
              >
                User Authentication
              </h6>
              <InputGroup size={"lg"}>
                <Input
                  placeholder="User"
                  className="input"
                  onChange={emailHandler}
                />
                <InputGroup.Addon>
                  <PeoplesIcon color={"#007BFF"} />
                </InputGroup.Addon>
              </InputGroup>
              <InputGroup size={"lg"} style={{marginTop:50}}>
                <Input
                  placeholder="Password"
                  type="password"
                  onChange={passwordHandler}
                />
                <InputGroup.Addon>
                  <EyeCloseIcon color={"#007BFF"} />
                </InputGroup.Addon>
              </InputGroup>
              <Button
                appearance="primary"
                className="btnSubmit"
                onClick={handleAuthentication}
                loading={process}
              >
                Submit
              </Button>
            </div>
          </div>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  );
}
