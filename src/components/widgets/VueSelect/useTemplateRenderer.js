/* eslint-disable arrow-body-style */
/* eslint-disable no-param-reassign */

/*
  This is an example of how to use nothing but render functions to generate out
  ui with custom events, bindings etc..
  In practical terms its pretty useless as using standard templates is much
  much much easier, maintainable and readable. €10 says if I look at this
  file in 6 months I wont have a clue whats going on.
*/

import { h } from 'vue';
import CaretIcon from './caret-icon.svg';
import XIcon from './x-icon.svg';

// Renders the search input. Will disable the input if search isnt enabled
function renderSearchInput(state, { classes, placeholder, isDisabled }) {
  return h(
    'input',
    {
      ref: 'inputRef',
      class: classes,
      value: state.searchText,
      onInput: (event) => { state.searchText = event.target.value; },
      onFocus: () => { if (!state.isDropdownVisible) state.isDropdownVisible = true; },
      placeholder,
      disabled: isDisabled,
    },
  );
}

// Renders the options to display in the dropdown.
function renderDropdownChoices(props, state, handlers) {
  if (!state.selectChoices.length) {
    return h('div', {
      class: 'vue-select__option-item',
    }, [
      'No options available',
    ]);
  }

  return state.selectChoices.map((item) => {
    const itemKey = item.id;
    const displayLabel = props.displayLabel(item);
    const classes = ['vue-select__option-item'];
    const isSelected = props.selected === item;
    let removeSelectedDiv = '';

    if (isSelected) {
      classes.push('vue-select__option-item--selected');

      removeSelectedDiv = h(
        'div',
        {
          class: 'vue-select__option-item-remove',
        },
        [
          h(
            XIcon,
            {
              class: 'vue-select__option-item-remove-icon',
            },
          ),
        ],
      );
    }

    return h(
      'div',
      {
        class: classes,
        onClick: (e) => handlers.onSelectItem(e, item),
        key: itemKey,
      },
      [
        h(
          'div',
          {
            class: 'vue-select__option-item-label',
          },
          displayLabel,
        ),
        removeSelectedDiv,
      ],
    );
  });
}

// Renders the dropdown
function renderDropdown(props, state, handlers) {
  if (state.isDropdownVisible) {
    return h(
      'div',
      { class: 'vue-select__options-wrapper' },
      [
        h(
          'div',
          { class: 'vue-select__options' },
          renderDropdownChoices(props, state, handlers),
        ),
      ],
    );
  }

  return '';
}

// Renders the item(s) that have been selected from the dropdown
function renderSelectedItems(props, state) {
  if (!props.selected) {
    return renderSearchInput(state, {
      classes: 'vue-select__input',
      placeholder: props.placeholder,
      isDisabled: !props.allowSearch,
    });
  }

  return renderSearchInput(state, {
    classes: 'vue-select__input',
    placeholder: props.displayLabel(props.selected),
    isDisabled: !props.allowSearch,
  });
}

// Returns a function that when called returns a render function
// that renderrs the entire dropdown
export default (props, state, handlers) => {
  return () => {
    return h(
      'div',
      {
        class: 'vue-select',
        ref: 'vueSelectRef',
      },
      [
        h(
          'div',
          {
            class: 'vue-select__selected',
            onClick: () => {
              if (!state.isDropdownVisible) state.isDropdownVisible = true;
              if (props.allowSearch) state.inputRef.focus();
            },
          },
          [
            h(
              'div',
              { class: 'vue-select__selected-items' },
              renderSelectedItems(props, state, handlers),
            ),
            h(
              'div',
              {
                class: 'vue-select__selected-dropdown-arrow',
              },
              [
                h(CaretIcon, {
                  class: state.dropdownArrowClasses,
                }),
              ],
            ),
          ],
        ),
        renderDropdown(props, state, handlers),
      ],
    );
  };
};
