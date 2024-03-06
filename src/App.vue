<template>
  <turtleTable :column="column" :tableData="tableData" :searchData="searchData" />
</template>
<script setup>
import { ref } from "vue";
// import Table from "./components/Table.vue";
const format = (e) => {
  const len = 6; // 固定长度
  let theNum = e + ""; // 数值
  let len2 = theNum.length; // 数值长度
  // 用0前补齐数值，达到lenNum长度
  let replaceStr = 0 + "";
  for (let j = 0; j < len - len2; j++) {
    theNum = replaceStr + theNum;
  }
  theNum = "Reagent" + theNum + "";
  return theNum;
};
const searchData = ref({
  sort: {},
  filter: [],
});
const tableData = ref([]);
const column = ref([
  {
    value: "id",
    title: "Reagent No",
    type: "format",
    format: format,
    sortable: true,
    disabled: false,
    filterType: "string",
    filterData: [{ data: "" }],
  },
  {
    value: "type",
    title: "Reagent Type",
    type: "string",
    sortable: true,
    disabled: false,
    filterType: "string",
    filterData: [{ data: "" }],
  },
  {
    value: "name",
    title: "Name",
    type: "string",
    sortable: true,
    disabled: false,
    filterType: "string",
    filterData: [{ data: "" }],
  },
  {
    value: "manufacturer",
    title: "Manufacturer",
    type: "string",
    sortable: true,
    disabled: false,
    filterType: "string",
    filterData: [{ data: "" }],
  },
  {
    value: "conjugate",
    title: "Conjugate",
    type: "string",
    sortable: true,
    disabled: false,
    filterType: "string",
    filterData: [{ data: "" }],
  },
  {
    value: "applications",
    title: "Applications",
    type: "tag",
    sortable: true,
    disabled: false,
    filterType: "string",
    filterData: [{ data: "" }],
  },
  {
    value: "handle",
    title: "Handle",
    type: "handle",
    buttonData: [
      {
        title: "edit",
        type: "",
      },
      {
        title: "delete",
        type: "danger",
      },
    ],
    disabled: false,
  },
]);
</script>
<style scoped></style>
