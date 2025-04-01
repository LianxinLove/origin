<template>
  <vxe-table
    border
    round
    show-overflow
    :scroll-y="{ enabled: true, gt: 0 }"
    ref="tableRef"
    :column-config="{ resizable: false }"
    :row-config="{
      isHover: true,
      keyField: keyField || '',
      useKey: useKey || '',
    }"
    :checkbox-config="{
      reserve: true,
      checkRowKeys: checkRowKeys || '',
      checkField: checkField || '',
    }"
    :radio-config="props.radioConfig"
    :data="props.tableData"
    :max-height="maxHeight"
    :min-height="minHeight"
    :height="height"
    @checkbox-all="selectAllChangeEvent"
    @checkbox-change="selectChangeEvent"
    @scroll-boundary="scrollEvent"
    @radio-change="handleRadioChange"
  >
    <vxe-column
      v-if="props.radio"
      type="radio"
      :title="props.radioTitle"
      width="60"
    ></vxe-column>
    <vxe-column v-if="props.checkbox" type="checkbox" width="60"></vxe-column>
    <template v-for="(item, i) in column" :key="i">
      <vxe-column
        :field="item.value"
        :title="item.title"
        min-width="220"
        show-header-overflow
        show-overflow="title"
      >
        <template #header>
          <span class="title">
            <span class="titleInfo">
              {{ item.title }}
            </span>

            <ArrowUpOutlined
              v-show="
                searchForm[0].value == 'asc' && searchForm[0].key == item.value
              "
            />
            <ArrowDownOutlined
              v-show="
                searchForm[0].value == 'desc' && searchForm[0].key == item.value
              "
            />
          </span>
          <a-dropdown :trigger="['click']" v-if="item.type != 'handle'">
            <a-button
              type="link"
              :icon="h(CaretDownOutlined)"
              @click="item.open = !item.open"
            />
            <template #overlay>
              <a-menu triggerSubMenuAction="click" class="menu">
                <a-menu-item @click="sortMethod('asc', item)">
                  <ArrowUpOutlined />
                  Sort Ascending
                </a-menu-item>
                <a-menu-item @click="sortMethod('desc', item)">
                  <ArrowDownOutlined />
                  Sort Descending
                </a-menu-item>
                <a-sub-menu
                  key="sub1"
                  title="Columns"
                  :icon="h(UnorderedListOutlined)"
                >
                  <a-checkbox-group
                    v-model:value="checkList"
                    :options="options"
                    @change="checkListChange"
                    class="tableCheckbox"
                    style="display: grid"
                  >
                    <template #label="{ title }">
                      <span>{{ title }}</span>
                    </template>
                  </a-checkbox-group>
                </a-sub-menu>
                <!-- :class="item.filterData[0].data == '' ? '' : searchClass" -->
                <a-sub-menu
                  key="sub2"
                  title="Filters"
                  :icon="h(SearchOutlined)"
                >
                  <template v-if="item.filterType == 'string'">
                    <a-input
                      v-model:value="item.filterData[0].data"
                      placeholder="Search"
                      style="width: 188px; display: block"
                      @input="inputFilter(item.filterData[0].data, item.value)"
                    />
                  </template>
                  <template v-if="item.filterType == 'date'">
                    <div>
                      <p class="filterTitleOnBody">before</p>
                      <a-date-picker
                        v-model:value="item.filterData[0].before"
                        type="date"
                        placeholder="Select date"
                        :getPopupContainer="
                          (triggerNode) => triggerNode.parentNode
                        "
                        style="width: 188px; margin-bottom: 8px; display: block"
                      />
                    </div>
                    <div>
                      <p class="filterTitleOnBody">after</p>
                      <a-date-picker
                        v-model:value="item.filterData[0].after"
                        type="date"
                        placeholder="Select date"
                        :getPopupContainer="
                          (triggerNode) => triggerNode.parentNode
                        "
                        style="width: 188px; margin-bottom: 8px; display: block"
                      />
                    </div>
                    <div>
                      <p class="filterTitleOnBody">on</p>
                      <a-date-picker
                        v-model:value="item.filterData[0].on"
                        type="date"
                        placeholder="Select date"
                        :getPopupContainer="
                          (triggerNode) => triggerNode.parentNode
                        "
                        style="width: 188px; margin-bottom: 8px; display: block"
                      />
                    </div>
                  </template>
                  <template v-if="item.filterType == 'number'">
                    <div>
                      <p class="filterTitleOnBody">
                        >
                        <a-input
                          v-model:value="item.filterData[0].gt"
                          style="width: 150px"
                          @input="
                            inputNumberFilter(
                              item.filterData[0].gt,
                              item.value,
                              'gt'
                            )
                          "
                        />
                      </p>
                    </div>
                    <div>
                      <p class="filterTitleOnBody">
                        {{ "<" }}
                        <a-input
                          v-model:value="item.filterData[0].lt"
                          style="width: 150px"
                          @input="
                            inputNumberFilter(
                              item.filterData[0].lt,
                              item.value,
                              'lt'
                            )
                          "
                        />
                      </p>
                    </div>
                    <div>
                      <p class="filterTitleOnBody">
                        {{ "=" }}
                        <a-input
                          v-model:value="item.filterData[0].eq"
                          style="width: 150px"
                          @input="
                            inputNumberFilter(
                              item.filterData[0].eq,
                              item.value,
                              'eq'
                            )
                          "
                        />
                      </p>
                    </div>
                  </template>
                </a-sub-menu>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
        <template #default="{ row }">
          <template v-if="item.type == 'string'">
            <span>{{ row[item.value] }}</span>
          </template>
          <template v-if="item.type == 'number'">
            <span>{{ row[item.value] }}</span>
          </template>
          <template v-if="item.type == 'format'">
            <span>{{ item.format(row[item.value]) }}</span>
          </template>
          <template v-if="item.type == 'tag'">
            <!-- :color="data.color" -->
            <a-tag v-for="(data, index) in row[item.value]" :key="index">
              {{ data }}
            </a-tag>
          </template>

          <template v-if="item.type == 'link'">
            <img v-if="item.icon" :src="item.icon" alt="" class="linkIcon" />
            <a-button type="link" @click="item.linkMethod(row)">{{
              row[item.value]
            }}</a-button>
          </template>
          <template v-if="item.type == 'handle'">
            <span
              v-for="(data, index) in item.buttonData"
              :key="index"
              style="margin-right: 5px"
            >
              <a-button
                type="primary"
                :danger="data.type == 'danger' ? true : false"
                @click="data.linkMethod(row)"
              >
                {{ data.title }}
              </a-button>
            </span>
          </template>
          <template v-if="item.type == 'custom'">
            <component :is="com[item.customName]" :data="item"></component>
          </template>
          <template v-if="item.type == ''">
            <span>{{ row[item.value] }}</span>
          </template>
        </template>
      </vxe-column>
    </template>
  </vxe-table>
</template>
<script setup>
import {
  EllipsisOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  UnorderedListOutlined,
  SearchOutlined,
  CaretDownOutlined,
} from "@ant-design/icons-vue";
import { ref, h } from "vue";
import { debounce } from "lodash";
// import { debounce } from "@/tools/tools.js";
defineOptions({
  name: "TurtleTable",
});
//父组件参数
const props = defineProps([
  "checkbox",
  "tableData",
  "column",
  "searchData",
  "selectAllChange",
  "selectChange",
  "radioChange",
  "keyField",
  "maxHeight",
  "minHeight",
  "height",
  "checkRowKeys",
  "checkField",
  "useKey",
  "scroll",
  "radioConfig",
  "radioTitle",
  "radio",
]);
const com = props;
const inputData = ref();
const inputItem = ref();
const searchForm = ref([
  {
    key: "",
    valye: "",
  },
]);
const columns = ref(props.column);
let searchClass = ref("isSearch");
let options = ref([]);
options.value = columns.value;

const tableRef = ref(null);
let column = ref([]);
column.value = columns.value;
let checkList = ref([]);
const init = () => {
  if (columns.value) {
    columns.value.forEach((e) => {
      checkList.value.push(e.value);
    });
  }
};
// 单选
const handleRadioChange = ({ row }) => {
  props.radioChange(row);
};
// 列控制
const checkListChange = () => {
  column.value = [];
  checkList.value.forEach((element) => {
    options.value.forEach((item) => {
      if (element === item.value) {
        column.value.push(item);
      }
    });
  });
  if (checkList.value.length == 1) {
    options.value.forEach((item) => {
      if (item.value === checkList.value[0]) {
        item.disabled = true;
      }
    });
  } else {
    options.value.forEach((item) => {
      item.disabled = false;
    });
  }
};
const check = (e) => {
  let status = false;
  props.searchData.filter.forEach((d) => {
    if (d.key == e) {
      status = true;
      return;
    } else {
      status = false;
    }
  });
  return status;
};
// 排序方法
const sortMethod = (state, item) => {
  searchForm.value[0].key = item.value;
  searchForm.value[0].value = state;
  props.searchData.sort = searchForm.value;
};
const inputDebounce = () => {
  if (check(inputItem.value)) {
    props.searchData.filter.forEach((e) => {
      if (e.key == inputItem.value) {
        e.value = inputData.value;
      }
    });
  } else {
    props.searchData.filter.push({
      key: inputItem.value,
      value: inputData.value,
      type: "string",
    });
  }
};
const inputNumberDebounce = (inputData, inputItem, type) => {
  if (check(inputItem)) {
    props.searchData.filter.forEach((e) => {
      if (e.key == inputItem) {
        e.value[type] = inputData;
      }
    });
  } else {
    const data = { gt: "", lt: "", eq: "" };
    data[type] = inputData;
    props.searchData.filter.push({
      key: inputItem,
      value: data,
      type: "number",
    });
  }
  console.log(props.searchData.filter);
};
// String input 筛选
const inputFilter = (data, item) => {
  inputData.value = data;
  inputItem.value = item;
  console.log(data, item);
  debounce(inputDebounce, 300)();
};
// number input 筛选
const inputNumberFilter = (data, item, type) => {
  // inputData.value = data;
  // inputItem.value = item;
  // const inputData = data;
  // const inputItem = item;
  // console.log(data, item, type);
  debounce(() => {
    inputNumberDebounce(data, item, type);
  }, 300)();
};
// checkbox
const selectAllChangeEvent = ({ checked }) => {
  const $table = tableRef.value;
  if ($table) {
    props.selectAllChange(checked);
  }
};
const selectChangeEvent = ({ checked, row, rowIndex }) => {
  const $table = tableRef.value;
  if ($table) {
    // $table.setCheckboxRow(row.bait, true);
    props.selectChange(checked, row, rowIndex);
  }
};
// scrollEvent
const scrollEvent = ({ direction, isLeft, isRight, isTop, isBottom }) => {
  if (isLeft) {
  }
  if (isRight) {
  }
  if (isTop) {
  }
  if (isBottom) {
    if (props.scroll) {
      props.scroll();
    }
  }
};
init();
defineExpose({
  tableRef,
});
</script>
<style lang="less" scoped>
body {
  height: 100vh;
  width: 100vw;
}
#app {
  width: 100%;
  height: 100%;
}

:deep(.vxe-header--column) {
  .vxe-cell {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;

    overflow: hidden;
    .vxe-cell--title {
      flex: 1;
      display: flex;
      justify-content: space-between;

      .title {
        max-width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 32px;
        .titleInfo {
          margin-right: 15px;
        }
        .anticon {
          color: #0088ff;
        }
      }
      .ant-btn {
        color: #383838;
      }
    }
  }
}
.tableCheckbox {
  max-height: 350px;
  overflow: auto;
}
.linkIcon {
  width: 30px;
  height: 30px;
}
:deep(.vxe-cell) {
  display: flex;
  flex-wrap: nowrap;
}
</style>
