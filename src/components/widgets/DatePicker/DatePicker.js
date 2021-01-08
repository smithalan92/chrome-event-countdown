import { h } from 'vue';
import FlatPickr from 'vue-flatpickr-component';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'flatpickr/dist/flatpickr.css';

export default {
  name: 'DatePicker',
  props: {
    selectedDate: {
      type: [Date, String],
      required: true,
    },
    minDate: {
      type: Date,
      required: false,
      default: new Date(),
    },
    dateFormat: {
      type: String,
      required: false,
      default: 'd M Y H:i',
    },
    enableTime: {
      type: Boolean,
      required: false,
      default: true,
    },
    use24HourTimeFormat: {
      type: Boolean,
      required: true,
      default: true,
    },
  },

  setup(props, { emit }) {
    return () => h('div', [
      h(FlatPickr, {
        value: props.selectedDate,
        config: {
          dateFormat: props.dateFormat,
          minDate: props.minDate,
          enableTime: props.enableTime,
          // appendTo: datePicker.value,
          time_24hr: props.use24HourTimeFormat,
        },
        'onUpdate:modelValue': (val) => {
          emit('update:selectedDate', val);
        },
      }),
    ]);
  },
};
