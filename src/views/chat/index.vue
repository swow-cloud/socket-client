<template>
  <PageWrapper title="聊天">
    <div class="flex">
      <div class="w-1/3 bg-white p-4">
        <div class="flex items-stretch">
          <div>
            <a-input-search
                v-model:value="value"
                placeholder="搜索好友或群组"
                style="width: 200px;border-radius:25px"
                @search="onSearch"
            />
          </div>

          <div>
            <UserAddOutlined :style="{fontSize: '31px', color: 'green', margin: '0px 0px 0px 15px'}"/>
          </div>
        </div>
        <div class="flex">
        </div>
        <p class="text-xs font-medium mt-4">消息列表({{ nums }})</p>
        <div class="flex">
          <template></template>
          <a-list
              class="demo-loadmore-list"
              :loading="loading"
              item-layout="horizontal"
              :data-source="dataList"
          >
            <template #loadMore>
              <div :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
                <a-spin v-if="loadingMore"/>
                <a-button v-else @click="loadMore">加载更多</a-button>
              </div>
            </template>
            <template #renderItem="{ item }">
              <a-list-item>
                <div class="flex flex-wrap">
                  <a-list-item-meta>
                    <template #title>
                      <div class="flex flex-nowrap">
                        <div>
                          <a href="https://www.antdv.com/">{{ item.name.last }}</a>
                        </div>
                        <div style="margin-left:5px">
                          <a-tag color="pink">BOT</a-tag>
                        </div>
                      </div>
                    </template>
                    <template #avatar>
                      <div class="grid md:grid-flow-col">
                        <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                      </div>
                    </template>
                  </a-list-item-meta>
                  <div style="margin-top:15px;" class="grid md:grid-flow-col">
                    <span class="text-left">[在线]</span>
                    <span class="truncate">Lorem ipsum{{randomRange(10,36)}} </span>
                  </div>
                </div>
              </a-list-item>
            </template>
          </a-list>
        </div>
      </div>

      <div class="w-2/3 bg-white ml-4 p-4">
        <span class="text-lg font-medium mr-4"> 消息记录: </span>
        <hr class="my-4"/>

        <div class="max-h-80 overflow-auto">
          <ul>
          </ul>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
import {PageWrapper} from '/@/components/Page';
import {defineComponent, ref} from 'vue';
import {UserAddOutlined} from '@ant-design/icons-vue';
import {useLoadMore} from 'vue-request';

const getFakeData = () => `https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo`;

export default defineComponent({
  components: {
    PageWrapper,
    UserAddOutlined,
    useLoadMore
  },
  setup() {
    const value = ref<string>('');
    const nums = 1;
    const onSearch = (searchValue: string) => {
      console.log('use value', searchValue);
      console.log('or use this.value', value.value);
    };
    const randomRange = function (min, max) {
      let returnStr = "",
          range = (max ? Math.round(Math.random() * (max - min)) + min : min),
          charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < range; i++) {
        const index = Math.round(Math.random() * (charStr.length - 1));
        returnStr += charStr.substring(index, index + 1);
      }
      return returnStr;
    }

    const {dataList, loading, loadingMore, loadMore} = useLoadMore(getFakeData, {
      listKey: 'results',
    });
    return {
      value,
      onSearch,
      nums,
      loading,
      loadingMore,
      dataList,
      loadMore,
      randomRange
    };
  },
});
</script>
<style scoped>
.demo-loadmore-list{
  min-height:350px;
}
</style>
