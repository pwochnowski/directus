<template>
  <private-view :title="$tc('Analytics', 2)">
    <template #title-outer:prepend>
      <v-button class="header-icon" rounded disabled icon secondary>
        <v-icon name="insert_chart_outlined" />
      </v-button>
    </template>
    <template>
      <v-input v-model="title">
        <template #prepend><v-icon name="person_search"/></template>
      </v-input>
      <v-select v-model="dropdownValue" :items="dropdownOptions">
        <template #prepend><v-icon name="person_search"/></template>
      </v-select>
    </template>
    <ul id="example-1">
      <li v-for="item in events" :key="item.id">
        {{ item.date }} {{ item.adverse_event }}
      </li>
    </ul>
    <template #sidebar>
      <sidebar-detail icon="info_outline" :title="$t('information')" close>
        <div
          class="page-description"
          v-html="$t('page_help_collections_item')"
        />
      </sidebar-detail>
      <!-- <revisions-drawer-detail
				v-if="isNew === false && _primaryKey"
				:collection="collection"
				:primary-key="_primaryKey"
				ref="revisionsDrawerDetail"
				@revert="refresh"
			/>
			<comments-sidebar-detail
				v-if="isNew === false && _primaryKey"
				:collection="collection"
				:primary-key="_primaryKey"
			/> -->
    </template>
  </private-view>
</template>

<script>
import { computed } from "@vue/composition-api";
import {
  getCollectionData,
  getVisibleCollections,
  getItem,
} from "./composables";

export default {
  inject: ["system"],
  async mounted() {
    console.log(this.system);
    console.log(this.getCollections());
    this.dropdownOptions = this.getCollections();

    this.patients = (await getCollectionData(this.system, {table: "patients"})).items.data;

    console.log("Patients: ", this.patients);
  },

  data() {
    return {
      title: "Default",
      dropdownOptions: [],
      dropdownValue: "",
      patients: [],
      events: [],
    };
  },
  watch: {
    title: async function(newValue, oldValue) {
      for (let p of this.patients) {
        if (newValue === p.name) {
          const items = (await getItem(this.system.api, { table: this.dropdownValue})).data;
          console.log(this.dropdownValue, items);
          let l = [];
          for (let i of items) {
            if (i.patient === p.id) {
              l.push(i);
            }
          }
          this.events = l;
          console.log(this.events);
        }
      }
      return this.title.value;
    },
    patient: function(newValue, oldValue) {
      console.log("patients loaded" + this.patients );
    },
    dropdownValue: function(newValue, oldValue) {
      console.log("Got value " + newValue + " prev " + oldValue);
      /* return getItem(this.system.api, { */
      /*   table: this.dropdownValue.value, */
      /* }).then((result) => { */
      /*   this.dropdownOptionsPatients = result.data.map((x) => { */
      /*     return { */
      /*       text: x.name, */
      /*       value: x.id, */
      /*     }; */
      /*   }); */
      /* }); */
    },
  },
  methods: {
    getCollections: function() {
      return getVisibleCollections(this.system).map((collection) => {
        return {
          text: collection.name,
          value: collection.collection,
        };
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.icon {
  --v-icon-color: var(--foreground-subdued);

  ::v-deep i {
    vertical-align: unset;
  }
}

.header-icon {
  --v-button-color-disabled: var(--foreground-normal);
}
</style>
