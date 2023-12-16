import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterableTable from "react-filterable-table";
// import Notiflix from 'Notiflix';
import "typeface-roboto/index.css";
import ArowBackIcon from "@rsuite/icons/ArowBack";
import {
  faDatabase,
  faUser,
  faPhone,
  faEnvelope,
  faIdCardClip,
  faFingerprint,
  faMagnifyingGlass,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  FlexboxGrid,
  Modal,
  Button,
  Drawer,
  Placeholder,
  IconButton,
  Toggle,
  Input,
  InputGroup,
  SelectPicker,
} from "rsuite";
import { Icon } from "@rsuite/icons";
import MenuIcon from "@rsuite/icons/Menu";
import "../../../assets/epats.css";
import "../../../assets/epats-bootstrap.css";
import EyeCloseIcon from "@rsuite/icons/EyeClose";
import OffIcon from "@rsuite/icons/Off";
import SearchIcon from "@rsuite/icons/Search";
import CalendarIcon from "@rsuite/icons/Calendar";
import MessageIcon from "@rsuite/icons/Message";
import ScatterIcon from "@rsuite/icons/Scatter";
import DragableIcon from "@rsuite/icons/Dragable";
import PeoplesIcon from "@rsuite/icons/Peoples";
import TaskIcon from "@rsuite/icons/Task";
import Http from "../../../Http/Http.js";
import routes from "../../../Routes/URLs.js";
import { DrawerMenu, Navigation } from "renderer/components";
import Notiflix from 'Notiflix'
const data = [
  { value: "F", label: "Female" },
  { value: "M", label: "Male" },
].map((item) => ({ label: item.label, value: item.value }));

const languageOption = [
  { value: 1, label: "Bemba" },
  { value: 2, label: "Tonga" },
  { value: 3, label: "Kaonde" },
  { value: 4, label: "Lozi" },
  { value: 5, label: "Nyanja" },
  { value: 6, label: "English" },
];

export function HomeScreen(props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const openMenuDrawer = (state) => {
    setOpen(state);
  };
  const [remoteAccessEnabled, setRemoteAccessEnabled] = useState(false);

  const handleToggle = () => {
    setRemoteAccessEnabled(!remoteAccessEnabled);
    // Add any additional logic you want to perform when the toggle switch changes state
  };

  const [openRegistrationModal, setRegistrationModal] = useState(false);

  const registrationModalHandler = (state) => {
    setRegistrationModal(state);
  };

  const [searchText, setSearchText] = useState("");
  const [searchProcess, setSearchProcess] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const searchHandler = async () => {
    if (searchText.length === 0) {
      return Notiflix.Notify.warning("Your search query is empty!");
    }
    setSearchProcess(true);
    await Http.get(`${routes.patient.search}/${searchText}`, {
      headers: {
        Authorization: `Bearer  ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      console.log(response);
      if (response.data.length === 0) {
        Notiflix.Notify.failure("No patients found! Try again");
        setSearchProcess(false);
      } else {
        setSearchResults(response.data);
      }
      setSearchProcess(false);
    });
  };
  //regustration

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("");
  const [mobilePhone, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");

  const [process, setProcess] = useState(false);
  const payLoads = {
    firstname: firstName,
    surname: surname,
    gender: gender,
    dateOfBirth: dateOfBirth,
    mobilePhone: mobilePhone,
    email: email,
    language: language,
    address: address,
  };
  const registrationHandler = async () => {
    setProcess(true);
    await Http.post(routes.patient.register, payLoads, {
      headers: {
        Authorization: `Bearer  ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200 || response.status === 204) {
          Notiflix.Notify.success("Patient registration successfull");
          setRegistrationModal(false);
          setProcess(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          Notiflix.Notify.warning(
            "Access token has expired! Please sign in again",
          );
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      });
  };

  //table   search results

  const resultsTableFields = [
    {
      name: "sn",
      displayName: "SN",
    },
    {
      name: "first_name",
      displayName: "First Name",
      inputFilterable: true,
    },
    {
      name: "surname",
      displayName: "Surname",
      inputFilterable: true,
    },
    {
      name: "mobile_phone_number",
      displayName: "Phone Number",
      inputFilterable: true,
    },
    {
      name: "address",
      displayName: "Address",
      inputFilterable: true,
    },
    {
      name: "gender",
      displayName: "Gender/Age",
      render: (props) => {
        return (
          <>
            <span>{props.record.gender}</span>
            {"/"}
            <span>{props.record.age}</span>
          </>
        );
      },
    },
    {
      name: "",
      displayName: "",
      render: (props) => {
        return (
          <>
            <IconButton
              icon={<EyeCloseIcon />}
              appearance="ghost"
              size="xs"
              onClick={() =>
                navigate("/PatientScreen", {
                  state: {
                    id: props.record.patient_id,
                    fname: props.record.first_name,
                    lname: props.record.surname,
                    age: props.record.age,
                    gender: props.record.gender,
                    address: props.record.address,
                    dob: props.record.date_of_birth,
                    phone: props.record.address,
                  },
                })
              }
            >
              Select
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Navigation />
      {/**** start of search compornt *****/}
      {searchResults.length > 0 ?
        <>
          <div style={{padding:20}}>
            <IconButton style={{
              float: 'right'
            }} size={"sm"} icon={<ArowBackIcon/>} appearance={"primary"} onClick={()=>{setSearchResults(false)}}> Back to search </IconButton>
                <FilterableTable
                            namespace="People"
                            loadingMessage="Please wait.."
                            initialSort="name"
                            data={searchResults}
                            fields={resultsTableFields}
                            noRecordsMessage="There are no people to display"
                            noFilteredRecordsMessage="No people match your filters!"
                            topPagerVisible={false}
                            pagerVisible={false}
                            pageSize={6}
                             pageSizes={6}
                          />
          </div>
        </>
        :
        <>
          {/*    No search results    */}
          <FlexboxGrid style={{ backgroundColor: "#FFF", height: "100%" }}>
            <FlexboxGrid.Item colspan={12} style={{ marginTop: 70 }} >
              <FlexboxGrid>
                <FlexboxGrid.Item colspan={24} className="menuLeft">
                  <div className="options">
                    <div className="optionTitle">Remote Access</div>
                    <div className="optionBody">
                      <p className="optionText">For patients seeking medical assitance</p>
                      {/*  toggle switch for rsuite*/}
                      <Toggle
                        checked={remoteAccessEnabled}
                        onChange={handleToggle}
                        style={{
                          width: '100px', // Adjust the width as needed
                          borderRadius: '8px', // Adjust the border radius as needed
                          backgroundColor: remoteAccessEnabled ? '#fbfbfb' : '#fbfbfb',
                          padding: '10px'
                        }}
                        size="lg" // Adjust the size (lg: large, md: medium, sm: small)
                        checkedChildren="Yes" // Text displayed when toggle is on
                        unCheckedChildren="No" // Text displayed when toggle is off
                      />
                    </div>
                  </div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={24}>
                  <FlexboxGrid>
                    <FlexboxGrid.Item colspan={24} className="menuLef">
                      <div className="options">
                        <div className="optionTitle">Add Recipient</div>
                        <div className="optionBody">
                          <p className="optionText">For patients newly enrolled into Hiv  Prevention and Treatment</p>
                          {/*  toggle switch for rsuite*/}
                          <IconButton size={"sm"} icon={<PeoplesIcon />} >  Import From SC+</IconButton>
                          <IconButton size={"sm"} onClick={registrationModalHandler} style={{ float: 'right', backgroundColor: "#000", color: "#FFF" }} icon={<PeoplesIcon color="white" style={{ backgroundColor: "#000" }} />} >  Add </IconButton>
                        </div>
                      </div>
                    </FlexboxGrid.Item>

                  </FlexboxGrid>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </FlexboxGrid.Item>
            {/*search inputs*/}
            <FlexboxGrid.Item colspan={12} style={{ margin: "auto", borderLeft: '1px solid #DDD', padding: 10 }}>
              <FlexboxGrid>
                <FlexboxGrid.Item colspan={24}> <div style={{ padding: 10, backgroundColor: 'inherit', fontSize: 14, fontWeight: 100 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 500, color: '#000', padding: 10 }}><FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: 20, backgroundColor: "#fff", borderRadius: 10 }} color={"#007aff"} /> Registered in ePATS </h3>
                  <Button appearance={"default"} size="sm" style={{ marginBottom: 10, float: 'right' }}> <FontAwesomeIcon icon={faFingerprint} /> Bio Search</Button>
                </div>    </FlexboxGrid.Item>

                <FlexboxGrid.Item colspan={12}>
                  <InputGroup inside style={{ marginBottom: 40, width: 230 }} size="lg">
                    <Input placeholder="First name" name="search" onChange={(text) => { setSearchText(text) }} />
                    <InputGroup.Button>
                      <PeoplesIcon />
                    </InputGroup.Button>
                  </InputGroup>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={12}>
                  <InputGroup inside style={{ marginBottom: 40, width: 230 }} size="lg">
                    <Input placeholder="Last name" className="search" onChange={(text) => { setSearchText(text) }} />
                    <InputGroup.Button>
                      <PeoplesIcon />
                    </InputGroup.Button>
                  </InputGroup>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={12}>
                  <InputGroup inside style={{ marginBottom: 40, width: 230 }} size="lg" >
                    <Input placeholder="Service ID/VMMC/TB/ART" className="search" onChange={(text) => { setSearchText(text) }} />
                    <InputGroup.Button>
                      <FontAwesomeIcon icon={faUser} />
                    </InputGroup.Button>
                  </InputGroup>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={12}>
                  <InputGroup inside style={{ marginBottom: 40, width: 230 }} size="lg"  >
                    <Input placeholder="Nupn" className="search" onChange={(text) => { setSearchText(text) }} />
                    <InputGroup.Button>
                      <PeoplesIcon />
                    </InputGroup.Button>
                  </InputGroup>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={12}>
                  <InputGroup inside style={{ marginBottom: 40, width: 230 }} size="lg"  >
                    <Input placeholder="NRC" className="search" onChange={(text) => { setSearchText(text) }} />
                    <InputGroup.Button>
                      <FontAwesomeIcon icon={faIdCardClip} />
                    </InputGroup.Button>
                  </InputGroup>

                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={12}>
                  <InputGroup inside style={{ marginBottom: 40, width: 230 }} size="lg" >
                    <Input placeholder="Mobile phone number" className="search" onChange={(text) => { setSearchText(text) }} />
                    <InputGroup.Button>
                      <FontAwesomeIcon icon={faPhone} />
                    </InputGroup.Button>
                  </InputGroup>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={24}>
                  <Button appearance={'primary'} size={"sm"} style={{ float: 'right', marginTop: 20, marginRight: 24 }} loading={searchProcess} onClick={searchHandler}> Submit </Button>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          {/*        ADDD NEW patients*/}

          <Modal size={"md"} open={openRegistrationModal} onClose={() => { registrationModalHandler(false) }} >
            <Modal.Header style={{ paddingBottom: 15, borderBottom: '1px solid #ddd' }}>
              <Modal.Title style={{ fontWeight: 600 }}>
                Patient Registration
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: 0, height: 600 }}>
              <FlexboxGrid>
                <FlexboxGrid.Item colspan={12}>
                  <div className="formGroup">
                    <Input type="text"  placeholder="first name" size="lg" onChange={(text) => { setFirstName(text) }} />
                  </div>
                  <div className="formGroup">
                    <SelectPicker data={data} style={{ width: '100%' }} size="lg" placeholder="Pick Gender" onChange={(text) => { setGender(text) }} />
                  </div>
                  <div className="formGroup">
                    <Input type="text" placeholder="Mobile Phone  Number" size="lg" onChange={(text) => { setMobile(text) }} />
                  </div>
                  <div className="formGroup" style={{ marginTop: 50 }}>
                    <SelectPicker data={languageOption} style={{ width: '100%' }} size="lg" placeholder="Language" onChange={(text) => { setLanguage(text) }} />
                  </div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={12}>

                  <div className="formGroup">
                    <Input type="text" placeholder="Surname" size="lg" onChange={(text) => { setSurname(text) }} />
                  </div>
                  <div className="formGroup">
                    <Input type="date" size="lg" onChange={(text) => { setDateOfBirth(text) }} />
                  </div>
                  <div className="formGroup">
                    <Input type="email" placeholder="Email address" size="lg" onChange={(text) => { setEmail(text) }} />
                  </div>

                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={24}>
                  <div className="formGroup">
                    <Input as="textarea" rows={3} placeholder="A complete address " onChange={(text) => { setAddress(text) }} />
                  </div>  </FlexboxGrid.Item>
              </FlexboxGrid>
            </Modal.Body>
            <Modal.Footer>
              <Button appearance="subtle">
                Cancel
              </Button>
              <Button size="sm" appearance="primary" onClick={registrationHandler} loading={process}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </>}
      {/**** end of search compornt *****/}
    </>
  );
}
