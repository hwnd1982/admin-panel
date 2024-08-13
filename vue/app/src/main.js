import Vue from "vue/dist/vue.js";
import axios from "axios";

new Vue({
  el: ".app",
  data: {
    pages: [],
    newPageName: "",
  },
  created() {
    this.updatePages();
  },
  methods: {
    createNewPage() {
      axios.post("./api/createNewHTMLPage.php", { name: this.newPageName }).then(response => {
        if (response.status === 200) {
          this.newPageName = "";
          this.updatePages();
        }
      });
    },
    updatePages() {
      axios.get("./api").then(({ data }) => {
        this.pages = data;
      });
    },
    removePage(page) {
      if (confirm(`Удалить страницу: ${page}?`)) {
        axios.post("./api/removeNewHTMLPage.php", { name: page }).then(response => {
          if (response.status === 200) {
            this.updatePages();
          }
        });
      }
    },
  },
});
