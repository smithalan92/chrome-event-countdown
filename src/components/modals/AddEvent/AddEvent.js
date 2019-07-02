import { Datetime } from 'vue-datetime';
import GlobalEvents from 'vue-global-events';
import CloseIcon from '@/assets/icons/close.svg';
import 'vue-datetime/dist/vue-datetime.css';

export default {
  name: 'AddEvent',

  components: {
    GlobalEvents,
    Datetime,
    CloseIcon,
  },

  data() {
    return {
      isVisible: false,
      eventName: '',
      eventDate: '',
      eventBackgroundImage: '',
      isOverlayVisible: false,
    };
  },

  methods: {
    async open() {
      this.isOverlayVisible = true;
      await this.$nextTick();
      this.isVisible = true;
    },

    async close() {
      this.isVisible = false;
      await this.$nextTick();
      this.isOverlayVisible = false;
      this.eventName = '';
      this.eventDate = '';
      this.eventBackgroundImage = '';
    },

    onClickAdd() {
      if (!this.validateInput()) {
        console.log('invalid input');
        return;
      }

      const date = new Date(this.eventDate);
      const eventId = this.generateEventId();

      this.$store.dispatch('addEvent', {
        eventId,
        eventName: this.eventName,
        eventDate: date,
        background: this.eventBackgroundImage,
      });

      this.close();
    },

    generateEventId() {
      return Math.floor(Math.random() * Date.now());
    },

    validateInput() {
      if (this.eventName === '') return false;
      if (this.eventDate === '') return false;

      if (this.eventBackgroundImage.endsWith('.png')
        || this.eventBackgroundImage.endsWith('.jpg')
        || this.eventBackgroundImage.endsWith('.jpeg')
        || this.eventBackgroundImage.endsWith('.gif')
      ) return true;

      if (this.eventBackgroundImage === '') {
        this.eventBackgroundImage = 'https://picsum.photos/1200/800';
      }

      return true;
    },

    onClickCancel() {
      this.close();
    },
  },
};
