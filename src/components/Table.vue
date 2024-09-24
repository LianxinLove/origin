<template>
  <vxe-table
    border
    round
    ref="tableRef"
    :column-config="{ resizable: false }"
    :row-config="{ isHover: true }"
    :data="props.tableData"
    @checkbox-all="selectAllChangeEvent"
    @checkbox-change="selectChangeEvent"
  >
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
                searchForm.dir == 'asc' && searchForm.sortField == item.value
              "
            />
            <ArrowDownOutlined
              v-show="
                searchForm.dir == 'desc' && searchForm.sortField == item.value
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
              <a-menu triggerSubMenuAction="click">
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
                      @change="inputFilter(item.filterData[0].data, item.value)"
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
                  <template v-if="item.filterType == 'num'">
                    <div>
                      <p class="filterTitleOnBody">
                        >
                        <a-input
                          v-model:value="item.filterData.gt"
                          style="width: 150px"
                        />
                      </p>
                    </div>
                    <div>
                      <p class="filterTitleOnBody">
                        {{ "<" }}
                        <a-input
                          v-model:value="item.filterData.lt"
                          style="width: 150px"
                        />
                      </p>
                    </div>
                    <div>
                      <p class="filterTitleOnBody">
                        {{ "=" }}
                        <a-input
                          v-model:value="item.filterData.eq"
                          style="width: 150px"
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
            <a-button type="link">{{ row[item.value] }}</a-button>
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
              >
                {{ data.title }}
              </a-button>
            </span>
          </template>
          <template v-if="item.type == 'custom'">
            <component :is="com[item.customName]" :data="item"></component>
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
import { debounce } from "@/tools/tools.js";
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
]);
const com = props;
const searchForm = ref({
  sortField: "",
  dir: "",
});
const columns = ref(props.column);
let searchClass = ref("isSearch");
let options = ref([]);
options.value = columns.value;

const tableRef = ref();
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
    if (d.value == e) {
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
  searchForm.value.sortField = item.value;
  searchForm.value.dir = state;
  props.searchData.sort = searchForm.value;
};
// String input筛选
const inputFilter = debounce((data, item) => {
  if (check(item)) {
    props.searchData.filter.forEach((e) => {
      if (e.key == item) {
        e.value = data;
      }
    });
  } else {
    props.searchData.filter.push({
      key: item,
      value: data,
      type: "string",
    });
  }
}, 300);
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
    props.selectChange(checked, row, rowIndex);
  }
};
init();
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
</style>
