import BaseModalOperator from './base-modal-operator.js';

const closeBtnRef = document.getElementById('user-profile-close-btn');
const wrapperRef = document.getElementById('user-profile');
const contentRef = document.getElementById('user-profile-content');

const UserModalOperator = BaseModalOperator.create({
  closeBtnRef,
  wrapperRef,
  contentRef,
});

export default UserModalOperator;
