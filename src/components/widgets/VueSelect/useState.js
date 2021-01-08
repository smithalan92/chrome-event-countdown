/* eslint-disable no-param-reassign */
import { reactive, computed, watch } from 'vue';

/*
  This file exports an funcition which returns a vue reactive object
  which contains the base state & computed state for the dropdown
*/

export default (props, context) => {
  const state = reactive({});

  state.isDropdownVisible = false;
  state.searchText = '';

  watch(() => state.searchText, () => context.emit('search', state.searchText));

  state.optionSearchKeys = computed(() => {
    if (!props.allowSearch) return {};

    return props.selectOptions.reduce((acc, item) => {
      let searchTarget = '';

      if (!props.searchKeys.length) {
        searchTarget = Object.values(item).join('').toLowerCase();
      } else {
        searchTarget = props.searchKeys.reduce((string, current) => {
          string += item[current];
          return string;
        }, '').toLowerCase();
      }

      acc[item.id] = searchTarget;
      return acc;
    }, {});
  });

  state.selectChoices = computed(() => {
    if (!state.searchText) return props.selectOptions;

    return props.selectOptions.filter((item) => state.optionSearchKeys[item.id].includes(state.searchText.toLowerCase()));
  });

  state.dropdownArrowClasses = computed(() => {
    const classes = ['vue-select__selected-dropdown-icon'];
    if (state.isDropdownVisible) classes.push('vue-select__selected-dropdown-icon--open');

    return classes;
  });

  return state;
};
