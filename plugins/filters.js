import Vue from "vue";
import moment from "moment";

// Vue.filter('formatDate', value => {
// 	if (!value) return ''
// 	return moment(value).format('LL');
// })

Vue.filter("day", function(value) {
  if (value) {
    return moment(String(value), "dddd, DD MMM YYYY").format("D MMM");
  }
});

Vue.filter("weekday", function(value) {
  if (value) {
    return moment(String(value), "dddd, DD MMM YYYY").format("dddd");
  }
});
