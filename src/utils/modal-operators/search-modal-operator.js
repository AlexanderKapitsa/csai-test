import BaseModalOperator from './base-modal-operator.js';

const closeBtnRef = document.getElementById('search-close-btn');
const wrapperRef = document.getElementById('search-modal');
const contentRef = document.getElementById('search-modal-content');

const SearchModalOperator = BaseModalOperator.create({
  closeBtnRef,
  wrapperRef,
  contentRef,
});

export default SearchModalOperator;
