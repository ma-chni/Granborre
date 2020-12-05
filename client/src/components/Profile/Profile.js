import React from "react";
import logo from "../../images/logo.svg";
import "./Profile.css";
import axios from "axios";
import { API_BASE_URL } from "../../constants/apiConstants";

const ImgUpload = ({ onChange, src }) => (
  <label htmlFor="photo-upload" className="custom-file-upload fas">
    <div className="img-wrap img-upload">
      <img
        className="img-class"
        htmlFor="photo-upload"
        src={src}
        alt="photoUpload"
      />
    </div>
    <input id="photo-upload" type="file" onChange={onChange} />
  </label>
);
const Name = ({
  nameOnChange,
  nameValue,
  smsValue,
  mailValue,
  handleChangeSms,
  handleChangeMail,
}) => (
  <div className="field">
    <label htmlFor="name">Namn:</label>
    <input
      id="name"
      type="text"
      onChange={nameOnChange}
      maxLength="25"
      value={nameValue}
      placeholder="Namn"
      required
    />
    <br></br>
    Skicka Email om nyheter och uppdateringar
    <input
      type="checkbox"
      name="mailChoice"
      defaultChecked={mailValue}
      onChange={handleChangeMail}
    />
    Skicka SMS om nyheter och uppdateringar
    <input
      type="checkbox"
      name="smsChoice"
      defaultChecked={smsValue}
      onChange={handleChangeSms}
    />
  </div>
);
const Status = () => <div className="field"></div>;
const Profile = ({ onSubmit, src, name, status }) => (
  <div className="card">
    <form className="profile-form" onSubmit={onSubmit}>
      <img className="App-logo" src={logo} alt="logo" />
      <h1>Min Profil</h1>
      <label className="custom-file-upload fas">
        <div className="img-wrap">
          <img
            className="img-class"
            htmlFor="photo-upload"
            src={src}
            alt="photoUpload"
          />
        </div>
      </label>
      <div className="name">{name}</div>
      <div className="status">{status}</div>
      <button type="submit" className="edit">
        Edit Profile{" "}
      </button>
    </form>
  </div>
);
const Edit = ({ onSubmit, children }) => (
  <div className="card">
    <form className="profile-form" onSubmit={onSubmit}>
      <img className="App-logo" src={logo} alt="logo" />
      <h1>Min Profil</h1>
      {children}
      <button type="submit" className="save">
        Spara
      </button>
    </form>
  </div>
);

class CardProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    file: "",
    imagePreviewUrl:
      "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true",
    name: "",
    status: "",
    active: "edit",
    smsChecked: false,
    mailChecked: false,
  };

  handleChangeSms = (e) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        smsChecked: !prevState.smsChecked,
      };
    });
  };

  handleChangeMail = (e) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        mailChecked: !prevState.mailChecked,
      };
    });
  };

  photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };
  editName = (e) => {
    const name = e.target.value;
    this.setState({
      name,
    });
  };
  editStatus = (e) => {
    const status = e.target.value;
    this.setState({
      status,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let activeP = this.state.active === "edit" ? "profile" : "edit";
    this.setState({
      active: activeP,
    });
    
    const props = this.props;
    const payload = {
      email: this.props.userEmail,
      smsChoice: this.state.smsChecked,
      mailChoice: this.state.mailChecked,
      name: this.state.name,
    };

    axios
      .post(API_BASE_URL + "/user/savepreferences", payload)
      .then(function (response) {
        if (response.status === 200) {
          props.showError(null);
        } else {
          props.showError("Preferences not saved");
        }
      })
      .catch(function (error) {
        if (error.response) {
          props.showError(
            "Preferences not saved. Please return to login page and try again"
          );
        }
      });
  };

  render() {
    const {
      imagePreviewUrl,
      name,
      status,
      active,
      smsChecked,
      mailChecked,
    } = this.state;
    return (
      <div className="container">
        {active === "edit" ? (
          <Edit onSubmit={this.handleSubmit}>
            <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl} />
            <Name
              nameOnChange={this.editName}
              handleChangeSms={this.handleChangeSms}
              handleChangeMail={this.handleChangeMail}
              smsValue={smsChecked}
              mailValue={mailChecked}
              nameValue={name}
            />
            <Status onChange={this.editStatus} value={status} />
          </Edit>
        ) : (
          <Profile
            onSubmit={this.handleSubmit}
            src={imagePreviewUrl}
            name={name}
            status={status}
          />
        )}
      </div>
    );
  }
}
export default CardProfile;
