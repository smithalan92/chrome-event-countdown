import { ref } from 'vue';
import useState from './useState';
import useOutsideClickListener from './useOutsideClickListener';
import useTemplateRenderer from './useTemplateRenderer';
import useEventHandlers from './useEventHandlers';

/*
  This file exports a Vue component that renders a dropdown
*/

export default {
  name: 'VueSelect',

  props: {
    selectOptions: {
      type: Array,
      required: true,
    },
    displayLabel: {
      type: Function,
      required: false,
      default: (item) => JSON.stringify(item),
    },
    selected: {
      required: true,
      validator: (prop) => typeof prop === 'object',
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Select an item',
    },
    allowMultiple: {
      type: Boolean,
      required: false,
      default: false,
    },
    allowSearch: {
      type: Boolean,
      required: false,
      default: false,
    },
    searchKeys: {
      type: Array,
      required: false,
      default: [],
    },
  },

  setup(props, context) {
    const vueSelectRef = ref(null);
    const inputRef = ref(null);

    const state = useState(props, context);
    // eslint-disable-next-line vue/no-ref-as-operand
    state.inputRef = inputRef;

    const handlers = useEventHandlers(props, state, context);

    const renderTemplate = useTemplateRenderer(props, state, handlers);

    useOutsideClickListener(state, vueSelectRef);

    return {
      vueSelectRef,
      renderTemplate,
      inputRef,
    };
  },

  // You might be wondering why I didnt return a function which
  // returns a render function in setup. I need access to template refs
  // and those need to be returned in the setup function.
  render() {
    return this.renderTemplate();
  },
};
