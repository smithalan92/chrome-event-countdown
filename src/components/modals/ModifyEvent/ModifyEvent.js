import { Datetime } from 'vue-datetime';
import GlobalEvents from 'vue-global-events';
import CloseIcon from '@/assets/icons/close.svg';
import 'vue-datetime/dist/vue-datetime.css';

export default {
  name: 'ModifyEvent',

  components: {
    GlobalEvents,
    Datetime,
    CloseIcon,
  },

  data() {
    return {
      eventId: null,
      isVisible: false,
      eventName: '',
      eventDate: '',
      eventBackgroundImage: '',
      isOverlayVisible: false,
    };
  },

  computed: {
    mode() {
      if (this.eventId) return 'edit';
      return 'add';
    },
  },

  methods: {
    async open() {
      this.isOverlayVisible = true;
      await this.$nextTick();
      this.isVisible = true;
      await this.$nextTick();
      this.$refs.name.focus();
    },

    async close() {
      this.isVisible = false;
      await this.$nextTick();
      this.isOverlayVisible = false;
      this.eventId = null;
      this.eventName = '';
      this.eventDate = '';
      this.eventBackgroundImage = '';
    },

    onClickConfirm() {
      if (this.mode === 'add') {
        this.onClickAdd();
      } else {
        this.onClickEdit();
      }
    },

    onClickAdd() {
      if (!this.validateInput()) {
        console.log('invalid input');
        return;
      }

      const date = new Date(this.eventDate);
      const newEventId = this.generateEventId();

      this.$store.dispatch('addEvent', {
        eventId: newEventId,
        eventName: this.eventName,
        eventDate: date,
        background: this.eventBackgroundImage,
      });

      this.close();
    },

    onClickEdit() {
      if (!this.validateInput()) {
        console.log('invalid input');
        return;
      }

      const date = new Date(this.eventDate);

      this.$store.dispatch('updateEvent', {
        eventId: this.eventId,
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

  mounted() {
    this.$store.subscribeAction((action) => {
      const { payload, type } = action;
      if (type === 'openAddEventModal') {
        if (payload) {
          this.eventId = payload.eventId;
          this.eventName = payload.eventName;
          this.eventDate = payload.eventDate;
          this.eventBackgroundImage = payload.eventBackgroundImage;
        }

        this.open();
      }
    });
  },
};
