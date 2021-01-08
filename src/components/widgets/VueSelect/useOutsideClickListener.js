import { onMounted, onBeforeUnmount } from 'vue';

/*
  This file exports an funcition which will hook into the mounted/unmounted
  calls, and detect clicks outside the dropdown in order to close it
*/

export default (state, vueSelectRef) => {
  const outsideClickListener = (e) => {
    if (!e.composedPath().includes(vueSelectRef.value)) {
      state.isDropdownVisible = false;
    }
  };

  onMounted(() => {
    document.addEventListener('click', outsideClickListener);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('click', outsideClickListener);
  });
};
