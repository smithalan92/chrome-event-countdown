/* eslint-disable no-restricted-syntax */

/*
  This file exports an funcition, which returns an object
  with event handlers the dropdown uses defined.
*/

export default (props, state, context) => {
  const onRemoveItem = async (e) => {
    e.stopPropagation();
    context.emit('update:selected', null);
  };

  const onSelectItem = (e, item) => {
    const isSelected = props.selected === item;

    if (isSelected) {
      onRemoveItem(e, item);
      return;
    }

    context.emit('update:selected', item);
    state.isDropdownVisible = false;
    state.searchText = '';
  };

  return {
    onSelectItem,
    onRemoveItem,
  };
};
