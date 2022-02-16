import { Projects } from './projects';
import { ApiFactory } from './service-base';
import { Skills } from './skills';

export const Api = ApiFactory({ Projects, Skills });
