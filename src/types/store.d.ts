import { type Store as VuexStore } from 'vuex';
import App from '~/App.vue';
import { type Commit, type Dispatch } from 'vuex';
import { type Guild, type User } from '~/types/types';

interface Store extends VuexStore<any> {
  $app: App;
  readonly state: any;
  dispatch: Dispatch;
  commit: Commit;
}

// declare my own store state
interface State {
  user: User;
  guild: Guild;
  commit: (event: string, data?: any) => void;
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $store: Store;
    $user: User;
    $guild: Guild;
  }
}
