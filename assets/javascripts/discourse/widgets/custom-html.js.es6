import { createLayoutsWidget } from 'discourse/plugins/discourse-layouts/discourse/lib/layouts';
import { scheduleOnce } from "@ember/runloop";
import { h } from 'virtual-dom';

export default createLayoutsWidget('custom-html', {
  defaultState() {
    return {
      renderScheduled: false
    };
  },

  html(attrs, state) {
    if (!state.renderScheduled) {
      let html = this.siteSettings.layouts_custom_html;

      const category = attrs.category;
      if (category && category.layouts_custom_html) {
        html = category.layouts_custom_html;
      }
      debugger;
      scheduleOnce('afterRender', this, function() {
        $("div.custom-html").append(`<div class='contents'>${html}</div>`);
      });
      state.renderScheduled = true;
    }
    return h('div.custom-html');
  }
});
