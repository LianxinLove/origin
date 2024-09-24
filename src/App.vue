<template>
  <!-- <turtleTable
    :check="true"
    :column="column"
    :tableData="tableData"
    :searchData="searchData"
  /> -->
  <div class="body">
    <Table
      :checkbox="true"
      :column="column"
      :tableData="tableData"
      :searchData="searchData"
      :selectAllChange="selectAllChangeEvent"
      :selectChange="selectAllChangeEvent"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import Table from "./components/Table.vue";
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
const tableData = ref([
  {
    bait: "NA",
    cellType: "-",
    description: "hsa_WT_Kidney_None(T); WTE_200ng",
    expId: 152952,
    experimentDate: "Sun, 27 Aug 2023 16:00:00 GMT",
    expname: "Exp166020",
    fluid: "-",
    idx: 0,
    instrument: "Q Exactive HF-X",
    lab: "Dr.Jun Qin Lab",
    numFraction: 1,
    numGene: 0,
    numIsoform: 0,
    numPeptide: 0,
    numRepeat: 1,
    numSpectrum: 0,
    operator: "Chen Ding",
    organ: "Kidney",
    species: "Homo sapiens (Human)",
    stage: -1,
    tissue: "Excretory system",
    type: "Profiling",
  },
  {
    bait: "NA",
    cellType: "-",
    description: "hsa_WT_Kidney_None(T); WTE_200ng",
    expId: 152917,
    experimentDate: "Sun, 27 Aug 2023 16:00:00 GMT",
    expname: "Exp165985",
    fluid: "-",
    idx: 1,
    instrument: "Q Exactive HF-X",
    lab: "Dr.Jun Qin Lab",
    numFraction: 1,
    numGene: 0,
    numIsoform: 0,
    numPeptide: 0,
    numRepeat: 1,
    numSpectrum: 0,
    operator: "Chen Ding",
    organ: "Kidney",
    species: "Homo sapiens (Human)",
    stage: -1,
    tissue: "Excretory system",
    type: "Profiling",
  },
  {
    bait: "NA",
    cellType: "-",
    description: "hsa_WT_Kidney_None(T); WTE_200ng",
    expId: 152916,
    experimentDate: "Sun, 27 Aug 2023 16:00:00 GMT",
    expname: "Exp165984",
    fluid: "-",
    idx: 2,
    instrument: "Q Exactive HF-X",
    lab: "Dr.Jun Qin Lab",
    numFraction: 1,
    numGene: 0,
    numIsoform: 0,
    numPeptide: 0,
    numRepeat: 1,
    numSpectrum: 0,
    operator: "Chen Ding",
    organ: "Kidney",
    species: "Homo sapiens (Human)",
    stage: -1,
    tissue: "Excretory system",
    type: "Profiling",
  },
  {
    bait: "NA",
    cellType: "-",
    description: "hsa_WT_Kidney_None(T); WTE_200ng",
    expId: 152914,
    experimentDate: "Sun, 27 Aug 2023 16:00:00 GMT",
    expname: "Exp165982",
    fluid: "-",
    idx: 3,
    instrument: "Q Exactive HF-X",
    lab: "Dr.Jun Qin Lab",
    numFraction: 1,
    numGene: 0,
    numIsoform: 0,
    numPeptide: 0,
    numRepeat: 1,
    numSpectrum: 0,
    operator: "Chen Ding",
    organ: "Kidney",
    species: "Homo sapiens (Human)",
    stage: -1,
    tissue: "Excretory system",
    type: "Profiling",
  },
  {
    bait: "NA",
    cellType: "-",
    description: "hsa_WT_Kidney_None(T); WTE_200ng",
    expId: 152913,
    experimentDate: "Sun, 27 Aug 2023 16:00:00 GMT",
    expname: "Exp165981",
    fluid: "-",
    idx: 4,
    instrument: "Q Exactive HF-X",
    lab: "Dr.Jun Qin Lab",
    numFraction: 1,
    numGene: 0,
    numIsoform: 0,
    numPeptide: 0,
    numRepeat: 1,
    numSpectrum: 0,
    operator: "Chen Ding",
    organ: "Kidney",
    species: "Homo sapiens (Human)",
    stage: -1,
    tissue: "Excretory system",
    type: "Profiling",
  },
]);
const column = ref([
  {
    value: "bait",
    title: "Reagent No",
    type: "format",
    format: format,
    sortable: true,
    disabled: false,
    filterType: "string",
    filterData: [{ data: "" }],
  },
  {
    value: "cellType",
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
const selectAllChangeEvent = (checked) => {
  console.log(checked);
};
</script>
<style scoped>
.body {
  padding: 18px 8px;
  border-radius: 8px;
  background: #e6e6e6;
  margin-bottom: 20px;
  width: 1200px;
}
</style>
