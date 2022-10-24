import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUsers: [],
    };
  }

  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        listUsers: this.props.listUsers,
      });
    }
  }

  handleDeleteUser(user) {
    this.props.deleteUserRedux(user.id);
  }

  handleEditUser(user) {
    this.props.editToParent(user);
  }

  render() {
    let users = this.state.listUsers;
    return (
      <div className="users-container container my-5">
        <table id="customers">
          <thead>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Phonenumber</th>
              <th>Options</th>
            </tr>
          </thead>

          <tbody>
            {users.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.email}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.address}</td>
                  <td>{item.phonenumber}</td>
                  <td>
                    <div>
                      <button
                        className="btn btn-edit"
                        onClick={() => this.handleEditUser(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => this.handleDeleteUser(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUserRedux: (userId) => dispatch(actions.deleteUser(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);