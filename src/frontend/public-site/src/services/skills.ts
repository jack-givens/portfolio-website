import { ApiRoute } from './service-base';

type SkillType = 'language' | 'framework' | 'technology';
export type Skill = {
  name: string;
  type: SkillType;
  wantToLearn: boolean;
};
const skillMaker =
  (type: SkillType) =>
  (name: string, wantToLearn = false): Skill => ({
    name,
    wantToLearn,
    type
  });
const lang = skillMaker('language');
const framework = skillMaker('framework');
const tech = skillMaker('technology');

const skillData = [
  lang('C#'),
  lang('JS'),
  lang('TS'),
  lang('Java'),
  lang('SQL'),
  lang('HTML'),
  lang('CSS'),
  lang('SASS'),
  lang('Python'),
  lang('Kotlin'),
  lang('Swift', true),
  lang('Elixir', true),
  lang('Go', true),
  lang('Rust', true),
  framework('Vue'),
  framework('React'),
  framework('React-Native'),
  framework('ASP.NET Core'),
  framework('Flux'),
  framework('Django'),
  framework('Flask'),
  framework('Node'),
  framework('REST'),
  framework('UIKit'),
  framework('Jetpack Compose'),
  framework('Webdriver'),
  framework('GraphQL', true),
  framework('SwiftUI', true),
  framework('Phoenix', true),
  framework('Tensorflow', true),
  tech('MSSQL'),
  tech('Postgres'),
  tech('Cassandra'),
  tech('DynamoDB'),
  tech('Redis'),
  tech('SQS'),
  tech('RabbitMQ'),
  tech('Docker'),
  tech('Prometheus'),
  tech('Nomad'),
  tech('Consul'),
  tech('Vault'),
  tech('Kubernetes'),
  tech('Kafka'),
  tech('Appium'),
  tech('Linkerd/Istio', true),
  tech('KNative', true),
  tech('Terraform', true)
];

export class Skills extends ApiRoute {
  getSkills = (): Promise<Skill[]> => this.Utils.delay([...skillData], 500);
}
