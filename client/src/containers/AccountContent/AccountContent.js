import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {connect} from 'react-redux';
import {fetchCancelBooking} from '../../actions/bookingActions';
import {
  fetchChangeUserInfo,
  fetchChangeUserAvatar,
} from '../../actions/userActions';

import Avatar from '../../components/Avatar';
import AccountBookings from '../../components/AccountBookings';
import AccountProfile from '../../components/AccountProfile';

class AccountContent extends Component {
  constructor(props) {
    super(props);

    this.state = {active: 'booking'};
    this.toggleSection = this.toggleSection.bind(this);
  }

  toggleSection(section) {
    this.setState({active: section});
  }

  render() {
    const {
      isAuth, userData, changeUserInfo, cancelBooking, changeUserAvatar,
    } = this.props;
    const {active} = this.state;

    if (!isAuth) return <Redirect to="/sign-in" />;

    let section;
    switch (active) {
      case 'profile':
        section = (
          <AccountProfile
            userData={userData}
            changeUserInfo={changeUserInfo}
          />
        );
        break;

      default:
        section = (
          <AccountBookings
            bookings={userData.bookings}
            cancel={cancelBooking}
            token={userData.token}
          />
        );
        break;
    }

    return (
      <div className="row pt-3">
        <div className="col-md-3">
          <div className="row position-relative">
            <div className="col-4 col-md-12 pr-0 pr-sm-3">
              <Avatar
                avatar={userData.avatar}
                token={userData.token}
                changeUserAvatar={changeUserAvatar}
              />
            </div>
            <div className="col-8 col-md-12 px-3">
              <div className="list-group">
                <button
                  onClick={() => this.toggleSection('booking')}
                  className={
                    `list-group-item list-group-item-action py-2${
                      active === 'booking' ? ' active' : ''}`
                  }
                >
                  Bookings
                </button>
                <button
                  onClick={() => this.toggleSection('profile')}
                  className={
                    `list-group-item list-group-item-action py-2${
                      active === 'profile' ? ' active' : ''}`
                  }
                >
                  Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8 mr-auto ml-auto">{section}</div>
      </div>
    );
  }
}

AccountContent.propTypes = {
  isAuth: PropTypes.bool,
  cancelBooking: PropTypes.func,
  changeUserInfo: PropTypes.func,
  changeUserAvatar: PropTypes.func,
  userData: PropTypes.shape({
    bookings: PropTypes.arrayOf(PropTypes.object),
    email: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    avatar: PropTypes.string,
    token: PropTypes.number,
  }),
};

const mapStateToProps = (state) => ({
  isAuth: state.authSuccess.isAuth,
  userData: state.authSuccess.userData,
});

const mapDispatchToProps = (dispatch) => ({
  cancelBooking: (date, time, token) => dispatch(fetchCancelBooking(date, time, token)),
  changeUserInfo: (name, value, token) => dispatch(fetchChangeUserInfo(name, value, token)),
  changeUserAvatar: (formData, token) => dispatch(fetchChangeUserAvatar(formData, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountContent);