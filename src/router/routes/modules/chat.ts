import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/chat',
  name: 'Chat',
  component: LAYOUT,
  redirect: '/chat/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:wechat',
    title: t('routes.dashboard.chat'),
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'ChatPage',
      component: () => import('/@/views/chat/index.vue'),
      meta: {
        title: t('routes.dashboard.chat'),
        icon: 'simple-icons:wechat',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
