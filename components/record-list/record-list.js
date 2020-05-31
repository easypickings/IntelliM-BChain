// components/record-list/record-list.js

const server = require('../../utils/server');

const app = getApp();

Component({
  /**
   * Component properties
   */
  properties: {
    records: {
      type: Array,
      value: []
    },
    canSelectSingle: {
      type: Boolean,
      value: true
    },
    canSelectMultiple: {
      type: Boolean,
      value: true
    }
  },

  /**
   * Component initial data
   */
  data: {
    selectionMode: false,
    showMoreMenu: false,
    moreMenuItems: [
      { text: '新建后续记录', value: 0 },
      { text: '删除记录', type: 'warn', value: 1 }
    ],
    currentItem: null
  },

  lifetimes: {
    attached: function () {
      
    }
  },

  /**
   * Component methods
   */
  methods: {
    onQuitSelection: function (e) {
      // emit QuitSelectionMode event
      this.triggerEvent('QuitSelectionMode');

      this.data.records.forEach((record) => { record.checked = false });
      this.setData({
        selectionMode: false,
        records: this.data.records
      });
    },

    onSelectAll: function (e) {
      this.data.records.forEach((record) => { record.checked = true });
      this.setData({
        records: this.data.records
      });
    },

    onSelectOther: function (e) {
      this.data.records.forEach((record) => { record.checked = !record.checked });
      this.setData({
        records: this.data.records
      });
    },

    onTapItem: function (e) {
      this.triggerEvent('TapItem', {
        record: e.mark.record
      });
    },

    onMore: function (e) {
      this.setData({
        currentItem: e.mark.record,
        showMoreMenu: true
      });
    },

    onLongPressItem: function (e) {
      // cannot select multiple, quit
      if (!this.properties.canSelectMultiple) return;

      // emit EnterSelectionMode event
      this.triggerEvent('EnterSelectionMode');

      this.setData({
        selectionMode: true,
        [`records[${e.mark.index}].checked`]: true
      });
      console.log(this.data.records);
    },

    onSelectionChanged: function (e) {
      console.log(this.data.records);
      console.log(e);
      for (let i = 0; i < this.data.records.length; i++) {
        let record = this.data.records[i];
        let t = e.detail.value.includes(record.id);
        console.log(t);
        if (record.checked != t) {
          this.setData({
            [`records[${i}].checked`]: t
          });
        }
      }
      console.log(this.data.records);
    },

    onShare: function () {
      this.triggerEvent('Share', {
        ids: this.data.records.map((record) => record.checked ? record.id : null).filter((id) => id)
      });
      console.log(this.data.records.map((record) => record.checked ? record.id : null).filter((id) => id));
    },

    onDelete: function () {
      this.triggerEvent('Delete', {
        ids: this.data.records.map((record) => record.checked ? record.id : null).filter((id) => id)
      });
      console.log(this.data.records.map((record) => record.checked ? record.id : null).filter((id) => id));
    },

    onSingleAction: function (e) {
      if (e.detail.index == 0) {
        this.triggerEvent('New', {
          id: this.data.currentItem.id
        });
      }
      else if (e.detail.index == 1) {
        this.triggerEvent('Delete', {
          ids: [ this.data.currentItem.id ]
        });
      }
      this.setData({
        showMoreMenu: false
      });
    }
  }
})
