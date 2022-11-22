import Vue from 'vue'
import VueTheMask from 'vue-the-mask'

// Table components
import LTable from "@/components/table/LTable";
import LTBody from "@/components/table/LTBody";
import LTData from "@/components/table/LTData";
import LTHead from "@/components/table/LTHead";
import LTRow from "@/components/table/LTRow";
import LTHeader from "@/components/table/LTHeader";
import LTFoot from "@/components/table/LTFoot";
import LTPaginationModule from "@/components/table/LTPaginationModule";
import LTLoaderModule from "@/components/table/LTLoaderModule";
import LTModalModule from "~/components/table/LTModalModule";

import LInput from "~/components/LInput";
import LButton from "@/components/LButton";
import LInputMasked from "@/components/LInputMasked";
import LNavBar from "@/components/LNavBar";
import LNavBarButton from "@/components/LNavBarButton";
import LAdminButton from "@/components/LAdminButton";
import LSvgBooleanStatus from "@/components/LSvgBooleanStatus";

Vue.use(VueTheMask)

// Table components
Vue.component('l-table', LTable)
Vue.component('l-thead', LTHead)
Vue.component('l-tbody', LTBody)
Vue.component('l-tfoot', LTFoot)
Vue.component('l-tr', LTRow)
Vue.component('l-td', LTData)
Vue.component('l-th', LTHeader)
Vue.component('l-tpag-module', LTPaginationModule)
Vue.component('l-tloader-module', LTLoaderModule)
Vue.component('l-tmodal-module', LTModalModule)

Vue.component('l-input', LInput)
Vue.component('l-input-masked', LInputMasked)
Vue.component('l-button', LButton)
Vue.component('l-navbar', LNavBar)
Vue.component('l-navbar-btn', LNavBarButton)
Vue.component('l-admin-button', LAdminButton)
Vue.component('l-svg-boolean-status', LSvgBooleanStatus)
